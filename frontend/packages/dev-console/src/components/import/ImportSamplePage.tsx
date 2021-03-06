import * as React from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { Formik } from 'formik';
import { K8sResourceKind } from '@console/internal/module/k8s';
import {
  FirehoseResource,
  LoadingBox,
  history,
  PageHeading,
} from '@console/internal/components/utils';
import { ImageStreamModel } from '@console/internal/models';
import { useK8sWatchResource } from '@console/internal/components/utils/k8s-watch-hook';
import {
  normalizeBuilderImages,
  NormalizedBuilderImages,
  getSampleRepo,
  getSampleRef,
  getSampleContextDir,
} from '../../utils/imagestream-utils';
import NamespacedPage, { NamespacedPageVariants } from '../NamespacedPage';
import { detectGitType, validationSchema } from './import-validation-utils';
import { createOrUpdateResources } from './import-submit-utils';
import { BaseFormData, GitImportFormData } from './import-types';
import ImportSampleForm from './ImportSampleForm';
import { getBaseInitialValues } from './form-initial-values';

type ImportSamplePageProps = RouteComponentProps<{ ns?: string; is?: string; isNs?: string }>;

const ImportSamplePage: React.FC<ImportSamplePageProps> = ({ match }) => {
  const { t } = useTranslation();
  const { ns: namespace, is: imageStreamName, isNs: imageStreamNamespace } = match.params;
  const defaultApplicationGroup = 'sample-app';

  const imageStreamResource: FirehoseResource = React.useMemo(
    () => ({
      kind: ImageStreamModel.kind,
      prop: 'imageStreams',
      isList: false,
      name: imageStreamName,
      namespace: imageStreamNamespace,
    }),
    [imageStreamName, imageStreamNamespace],
  );

  const [imageStream, imageStreamloaded] = useK8sWatchResource(imageStreamResource);

  if (!imageStreamloaded) return <LoadingBox />;

  const { [imageStreamName]: builderImage }: NormalizedBuilderImages = normalizeBuilderImages(
    imageStream,
  );

  const { name: imageName, recentTag: tag } = builderImage;

  const gitUrl = getSampleRepo(tag);
  const gitRef = getSampleRef(tag);
  const gitDir = getSampleContextDir(tag);
  const gitType = detectGitType(gitUrl);

  const initialBaseValues: BaseFormData = getBaseInitialValues(namespace, defaultApplicationGroup);
  const initialValues: GitImportFormData = {
    ...initialBaseValues,
    name: `${imageName}-sample`,
    application: {
      initial: defaultApplicationGroup,
      name: defaultApplicationGroup,
      selectedKey: defaultApplicationGroup,
    },
    git: {
      url: gitUrl,
      type: gitType,
      ref: gitRef,
      dir: gitDir,
      showGitType: false,
      secret: '',
      isUrlValidating: false,
    },
    docker: {
      dockerfilePath: 'Dockerfile',
    },
    image: {
      ...initialBaseValues.image,
      selected: imageName,
      tag: tag.name,
      tagObj: tag,
    },
    pipeline: {
      enabled: false,
    },
    build: {
      ...initialBaseValues.build,
      triggers: {
        webhook: true,
        image: true,
        config: true,
      },
    },
  };

  const handleSubmit = (values, actions) => {
    const resourceActions = createOrUpdateResources(
      t,
      values,
      imageStream as K8sResourceKind,
      false,
      true,
    ).then(() => createOrUpdateResources(t, values, imageStream as K8sResourceKind));

    return resourceActions
      .then(() => {
        history.push(`/topology/ns/${namespace}`);
      })
      .catch((err) => {
        actions.setStatus({ submitError: err.message });
      });
  };

  return (
    <NamespacedPage variant={NamespacedPageVariants.light} disabled hideApplications>
      <Helmet>
        <title>{t('devconsole~Create Sample Application')}</title>
      </Helmet>
      <PageHeading title={t('devconsole~Create Sample Application')} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onReset={history.goBack}
        validationSchema={validationSchema(t)}
      >
        {(formikProps) => <ImportSampleForm {...formikProps} builderImage={builderImage} />}
      </Formik>
    </NamespacedPage>
  );
};

export default ImportSamplePage;
