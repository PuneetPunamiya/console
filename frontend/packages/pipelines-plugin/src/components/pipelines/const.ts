export enum StartedByLabel {
  triggers = 'triggers.tekton.dev/eventlistener',
}
export enum StartedByAnnotation {
  user = 'pipeline.openshift.io/started-by',
}

export enum TektonResourceLabel {
  pipeline = 'tekton.dev/pipeline',
  pipelinerun = 'tekton.dev/pipelineRun',
  taskrun = 'tekton.dev/taskRun',
  pipelineTask = 'tekton.dev/pipelineTask',
}

export enum PipelineResourceType {
  git = 'git',
  image = 'image',
  cluster = 'cluster',
  storage = 'storage',
}

export const pipelineResourceTypeSelections = {
  '': 'Select resource type',
  [PipelineResourceType.git]: 'Git',
  [PipelineResourceType.image]: 'Image',
  [PipelineResourceType.cluster]: 'Cluster',
  [PipelineResourceType.storage]: 'Storage',
};

export enum VolumeTypes {
  EmptyDirectory = 'Empty Directory',
  ConfigMap = 'Config Map',
  Secret = 'Secret',
  PVC = 'PVC',
}

export enum SecretAnnotationId {
  Git = 'git',
  Image = 'docker',
}

export const SecretAnnotationType = {
  [SecretAnnotationId.Git]: 'Git Server',
  [SecretAnnotationId.Image]: 'Docker Registry',
};

export const PIPELINE_SERVICE_ACCOUNT = 'pipeline';
export const PIPELINE_RUN_AUTO_START_FAILED = `bridge/pipeline-run-auto-start-failed`;

export const DEFAULT_CHART_HEIGHT = 275;
export const DEFAULT_LEGEND_CHART_HEIGHT = 375;
export const DEFAULT_TIME_RANGE = '1w';
export const DEFAULT_REFRESH_INTERVAL = '30s';
export const DEFAULT_SAMPLES = 60;
