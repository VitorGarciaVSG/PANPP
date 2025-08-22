
import type { Equipment, TeamAssetMap } from './types';

export const equipamentos: Equipment[] = [
    { id: 'rtk', nome: 'RTK', imagem: 'https://adenilsongiovanini.com.br/equipamentos/wp-content/webp-express/webp-images/uploads/2022/02/coletora-de-dados-r550.png.webp' },
    { id: 'coletora', nome: 'COLETORA', imagem: 'https://www.embratop.com.br/wp-content/uploads/2024/04/RTK-Freyja-02.jpg' },
    { id: 'antena', nome: 'ANTENA', imagem: 'http://escolarivers.com.br/wp-content/uploads/2025/08/image-1.png' },
    { id: 'suporte', nome: 'SUPORTE COLETORA', imagem: 'http://escolarivers.com.br/wp-content/uploads/2025/08/Suporte-Coletor-Universal-Portatil-Para-Gps-Rtk-Zz-_-Parcelamento-sem-juros.png' },
    { id: 'niveladora', nome: 'NIVELADORA', imagem: 'http://escolarivers.com.br/wp-content/uploads/2025/08/image-5.png' },
    { id: 'cabo', nome: 'CABO USB-C', imagem: 'http://escolarivers.com.br/wp-content/uploads/2025/08/fb8byuwxmzfq0oj6tgvel8i6jpbwwenoxj5e_640x640fill_ffffff.jpg' }
];

export const teamAssetMap: TeamAssetMap = {
    '1 - BRUNO': '80803',
    '2 - JEFERSON': '80804',
    '3 - FRANCIVALDO': '80805',
    '4 - ALEXANDRO': '80806',
    'ESTOQUE': ''
};
