export async function getRandomLorem() {
  const response = await fetch(
    "https://baconipsum.com/api/?type=meat-and-filler&sentences=20"
  );
  return response.json();
}
