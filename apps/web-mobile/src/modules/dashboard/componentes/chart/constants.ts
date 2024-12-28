import { ChartConfigType } from './types';

export const materialColors = {
  GLASS: '#0034D4',
  TEXTILE: '#40AA17',
  ORGANIC: '#000CAC',
  PLASTIC: '#4CA0FF',
  PAPER: '#1E8800',
  METAL: '#68D23F',
  LANDFILL_WASTE: '#0049E9',
};

export const chartConfig: ChartConfigType = {
  GLASS: {
    label: 'Glass',
    color: materialColors.GLASS,
  },
  ORGANIC: {
    label: 'Organic',
    color: materialColors.ORGANIC,
  },
  TEXTILE: {
    label: 'Textile',
    color: materialColors.TEXTILE,
  },
  PLASTIC: {
    label: 'Plastic',
    color: materialColors.PLASTIC,
  },
  PAPER: {
    label: 'Paper',
    color: materialColors.PAPER,
  },
  METAL: {
    label: 'Metal',
    color: materialColors.METAL,
  },
  LANDFILL_WASTE: {
    label: 'Landfill Waste',
    color: materialColors['LANDFILL_WASTE'],
  },
};
