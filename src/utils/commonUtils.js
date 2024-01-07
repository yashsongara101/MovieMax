export function numberFormatter(n, digits = 1) {
  var base = Math.floor(Math.log(Math.abs(n))/Math.log(1000));
  var suffix = 'kmb'[base-1];
  return suffix ? String(n/Math.pow(1000,base)).substring(0,3)+suffix : ''+n;
}