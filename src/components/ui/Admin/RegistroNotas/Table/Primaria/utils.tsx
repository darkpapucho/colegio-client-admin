export function convertNumberToLetra(nota: number) {
  /**
   *  0-10 = C ; 11 - 14 : B ; 15- 17: A, 18 - 20 : AD
   */
  if (nota < 0 || nota > 20) return 'X';
  if (nota > 17 && nota <= 20) {
    return 'AD';
  } else if (nota <= 17 && nota > 14) {
    return 'A';
  } else if (nota <= 14 && nota > 10) {
    return 'B';
  } else {
    return 'C';
  }
}

export function getColorsByNota(nota: number) {
  if (nota < 0 || nota > 20) return { bgColor: '#404040', textColor: '#f0f0f0' };
  if (nota > 17 && nota <= 20) {
    return { bgColor: '#3380e4', textColor: '#fdfdfd' };
  } else if (nota <= 17 && nota > 14) {
    return { bgColor: '#469e61', textColor: '#e5ece7' };
  } else if (nota <= 14 && nota > 10) {
    return { bgColor: '#c47e2e', textColor: '#e6e3df' };
  } else {
    return { bgColor: '#be361e', textColor: '#eeeaea' };
  }
}
