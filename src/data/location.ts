/** Temple GPS — Damodarpur Paschim, Ramnagar, Purba Medinipur (PIN 721446) */
export const templeLocation = {
  latitude: 21.7027,
  longitude: 87.5201,
  label: 'Beteswar Jhaareswar Shiva Mandir',
  address: 'Beteswar, Damodarpur, Ramnagar, Purba Medinipur, West Bengal — PIN 721446',
} as const

export const templeMapsUrl = `https://www.google.com/maps/search/?api=1&query=${templeLocation.latitude},${templeLocation.longitude}`

export const templeDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${templeLocation.latitude},${templeLocation.longitude}`

export const templeOsmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${templeLocation.longitude - 0.02}%2C${templeLocation.latitude - 0.015}%2C${templeLocation.longitude + 0.02}%2C${templeLocation.latitude + 0.015}&layer=mapnik&marker=${templeLocation.latitude}%2C${templeLocation.longitude}`
