/**
 * Coverts text from highlight api
 * @param text - text to be coverted
 * @returns converted text
 */
export function highlightTextConverter(text: string): string {
  switch (text) {
    case 'alert':
      return 'Meta longe de ser batida'
    case 'success':
      return 'A meta do mês foi batida! Parabens'
    case 'warning':
      return 'Falta pouco, vamos lá'
    default:
      return 'Sem dados no momento'
  }
}
