import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { ExternalLink } from '@console/internal/components/utils';
import { Popover, PopoverPosition, Stack, StackItem } from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

import { CLOUD_INIT_DOC_LINK } from '../../../../../utils/strings';

export const CloudInitInfoHelper = () => {
  const { t } = useTranslation();
  return (
    <Popover
      position={PopoverPosition.right}
      aria-label={t('kubevirt-plugin~cloud init help')}
      bodyContent={
        <Stack hasGutter>
          <StackItem>
            {t(
              'kubevirt-plugin~You can use cloud-init for post installation configuration of the guest operating system. The guest OS needs to have the cloud-init service running.',
            )}
          </StackItem>
          <StackItem>
            <div className="text-muted">
              {t(
                'kubevirt-plugin~cloud-init is already configured in cloud images of Fedora and RHEL',
              )}
            </div>
          </StackItem>
          <StackItem>
            <ExternalLink text={t('kubevirt-plugin~Learn more')} href={CLOUD_INIT_DOC_LINK} />
          </StackItem>
        </Stack>
      }
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="pf-c-form__group-label-help"
        aria-label={t('kubevirt-plugin~cloud init help')}
      >
        <HelpIcon noVerticalAlign />
      </button>
    </Popover>
  );
};
