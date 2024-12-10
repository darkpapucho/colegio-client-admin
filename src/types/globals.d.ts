export interface MenuItem {
  label: string;
  url: string;
  icon: JSX.Element;
}

export type Align = 'left' | 'right' | 'center';

export type Size = 'small' | 'medium' | 'large';

export type CSSUnit = 'px' | 'rem' | 'em' | '%';

export type WidthCss = `${number}${CSSUnit}` | 'auto' | 'min-content' | 'max-content' | 'fit-content';

type Month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

export type FechaMatricula = `${Year}-${Month}-${number}`;

export interface SelectedDocuments {
  certificadoNoAdeudo: boolean;
  certificadoConducta: boolean;
  resolucionTraslado: boolean;
}
