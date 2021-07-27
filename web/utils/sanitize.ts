type Str = string | undefined

export function sanitizeString(str:Str){
  str = str?.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
  return str?.trim();
}