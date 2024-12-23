import { ChartConfigType } from './types';

export const colors = {
  GLASS: '#0034D4',
  TEXTILE: '#40AA17',
  ORGANIC: '#000CAC',
  PLASTIC: '#4CA0FF',
  PAPER: '#1E8800',
  METAL: '#68D23F',
  'LANDFILL WASTE': '#0049E9',
};

export const chartConfig: ChartConfigType = {
  GLASS: {
    label: 'Glass',
    color: colors.GLASS,
  },
  ORGANIC: {
    label: 'Organic',
    color: colors.ORGANIC,
  },
  TEXTILE: {
    label: 'Textile',
    color: colors.TEXTILE,
  },
  PLASTIC: {
    label: 'Plastic',
    color: colors.PLASTIC,
  },
  PAPER: {
    label: 'Paper',
    color: colors.PAPER,
  },
  METAL: {
    label: 'Metal',
    color: colors.METAL,
  },
  'LANDFILL WASTE': {
    label: 'Landfill Waste',
    color: colors['LANDFILL WASTE'],
  },
};
