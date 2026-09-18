export default function isEnable(context) {
  const {isReady} = this.collectContext(context, {
    isReady: "blast.isReady",
  });
  return isReady;
}
