import { PersistentVolumeClaimKind, PodKind, TemplateKind } from '@console/internal/module/k8s';
import { FirehoseResult } from '@console/internal/components/utils/types';

import { TemplateItem } from '../../../types/template';
import { VMIKind, VMKind } from '../../../types';
import { V1alpha1DataVolume } from '../../../types/api';

export type VirtualMachineTemplateBundle = {
  template?: TemplateItem;
  customizeTemplate?: {
    vm: VMKind;
    template: TemplateKind;
  };
};

export type VMTemplateRowProps = {
  dataVolumes: V1alpha1DataVolume[];
  pvcs: PersistentVolumeClaimKind[];
  pods: PodKind[];
  vmis: FirehoseResult<VMIKind[]>;
  namespace: string;
  loaded: boolean;
  isPinned: (template: TemplateItem) => boolean;
  togglePin: (template: TemplateItem) => void;
  sourceLoadError: any;
};
