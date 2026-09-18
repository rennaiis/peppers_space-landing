function addParticle(object, particle) {
  const {particleConfig} = particle;
  object.add(particleConfig.emitter);

  return () => {
    particleConfig.dispose();
  };
}

export {addParticle};
