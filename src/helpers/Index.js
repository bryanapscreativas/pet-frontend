export const getPetAge = (birthDate) => {
  if (!birthDate) return 'N/A';
  const birth = new Date(birthDate);
  const now = new Date();
    
  // Calcular años
  const years = now.getFullYear() - birth.getFullYear();
    
  // Calcular días
  const diffTime = now - birth;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
  return {
    years,
    days: diffDays,
    display: `${years} años (${diffDays} días)`
  };
};
