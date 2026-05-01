import React from 'react';
import {
  AzaleeBonsaiMascot,
  CarmonaMascot,
  ErableJaponMascot,
  FicusGinsengMascot,
  GenevrierMascot,
  SerissaMascot,
} from './bonsai';
import {
  BasilicMascot,
  CibouletteMascot,
  LavandeMascot,
  MentheMascot,
  RomarinMascot,
  ThymMascot,
} from './aromatic';
import {
  AgaveMascot,
  AloeVeraMascot,
  CollierCoeursMascot,
  CollierPerlesMascot,
  EcheveriaMascot,
  GymnocalyciumMascot,
  HaworthiaMascot,
  JadeMascot,
  JoubarbeMascot,
  LithopsMascot,
  MammillaireMascot,
  OpuntiaMascot,
} from './succulent';
import {
  AlocasiaPollyMascot,
  AlocasiaZebrinaMascot,
  AnthuriumMascot,
  BambouBonheurMascot,
  BegoniaRexMascot,
  CalatheaMedallionMascot,
  CalatheaOrbifoliaMascot,
  CaoutchoucMascot,
  DracaenaMascot,
  FicusLyrataMascot,
  HoyaCarnosaMascot,
  HoyaKerriiMascot,
  LysPaixMascot,
  MonsteraAdansoniiMascot,
  MonsteraDeliciosaMascot,
  OrchideeMascot,
  PhilodendronMascot,
  PileaMascot,
  PinkPrincessMascot,
  PlanteAraigneeMascot,
  PothosMascot,
  SansevieriaMascot,
  TradescantiaMascot,
  YuccaMascot,
  ZzPlantMascot,
  OiseauParadisMascot,
} from './tropical';
import { MascotComponentProps } from './shared';

export const MASCOT_REGISTRY: Record<string, React.FC<MascotComponentProps>> = {
  // Bonsaï
  'ficus-ginseng': FicusGinsengMascot,
  'genevrier': GenevrierMascot,
  'carmona': CarmonaMascot,
  'erable-japon': ErableJaponMascot,
  'serissa': SerissaMascot,
  'azalee-bonsai': AzaleeBonsaiMascot,

  // Succulentes & cactus
  'aloe-vera': AloeVeraMascot,
  'echeveria': EcheveriaMascot,
  'jade': JadeMascot,
  'haworthia': HaworthiaMascot,
  'lithops': LithopsMascot,
  'mammillaire': MammillaireMascot,
  'gymnocalycium': GymnocalyciumMascot,
  'opuntia': OpuntiaMascot,
  'collier-perles': CollierPerlesMascot,
  'collier-coeurs': CollierCoeursMascot,
  'joubarbe': JoubarbeMascot,
  'agave': AgaveMascot,

  // Tropical
  'monstera-deliciosa': MonsteraDeliciosaMascot,
  'monstera-adansonii': MonsteraAdansoniiMascot,
  'pothos': PothosMascot,
  'philodendron': PhilodendronMascot,
  'philodendron-pink-princess': PinkPrincessMascot,
  'oiseau-paradis': OiseauParadisMascot,
  'calathea-orbifolia': CalatheaOrbifoliaMascot,
  'calathea-medallion': CalatheaMedallionMascot,
  'alocasia-zebrina': AlocasiaZebrinaMascot,
  'alocasia-polly': AlocasiaPollyMascot,
  'ficus-lyrata': FicusLyrataMascot,
  'hoya-kerrii': HoyaKerriiMascot,
  'hoya-carnosa': HoyaCarnosaMascot,
  'pilea': PileaMascot,
  'begonia-rex': BegoniaRexMascot,
  'tradescantia': TradescantiaMascot,
  'sansevieria': SansevieriaMascot,
  'zz-plant': ZzPlantMascot,
  'lys-paix': LysPaixMascot,
  'plante-araignee': PlanteAraigneeMascot,
  'caoutchouc': CaoutchoucMascot,
  'dracaena': DracaenaMascot,
  'yucca': YuccaMascot,
  'bambou-bonheur': BambouBonheurMascot,
  'anthurium': AnthuriumMascot,
  'orchidee': OrchideeMascot,

  // Aromatic
  'basilic': BasilicMascot,
  'lavande': LavandeMascot,
  'romarin': RomarinMascot,
  'menthe': MentheMascot,
  'thym': ThymMascot,
  'ciboulette': CibouletteMascot,
};

export function getMascotComponent(speciesId: string): React.FC<MascotComponentProps> {
  return MASCOT_REGISTRY[speciesId] ?? FicusGinsengMascot;
}
