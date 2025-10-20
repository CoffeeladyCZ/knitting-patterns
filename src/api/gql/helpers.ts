export const gql = (strings: TemplateStringsArray, ...values: unknown[]) => 
  strings.map((str, i) => str + (values[i] || '')).join(''); 