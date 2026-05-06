
export async function buscarEnderecos(query) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&countrycodes=br`);
  
  if (!response.ok) {
    throw new Error("Erro ao buscar endereços");
  }

  const data = await response.json();
  return data;
}