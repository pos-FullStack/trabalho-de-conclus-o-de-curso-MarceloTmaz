export async function buscarEnderecos(query) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&countrycodes=br`);

  if (!response.ok) {
    throw new Error("Erro ao buscar endereços");
  }

  const data = await response.json();

  // Mapear somente rua, bairro e cidade
  const filtrado = data.map(item => {
    const { road, suburb, city, town, village } = item.address;

    return {
      rua: road || "",
      bairro: suburb || "",
      cidade: city || town || village || ""
    };
  });
  console.log(filtrado)
  return filtrado;
}
 // setupAutocomplete("partida", "dropdown-partida");