/** Temple location — from official Google Maps pin */
export const templeGoogleMapsUrl = 'https://maps.app.goo.gl/eZ6ExHFR7qRyVTM5A?g_st=ic'

export const templeLocation = {
  label: 'Beteswar Jhaareswar Shiva Mandir',
  address: 'Beteswar Temple, Balakbar - Beteswar Rd, Sadi, West Bengal — PIN 721446',
  plusCode: 'PG26 G4R',
  mapsQuery: 'PG26 G4R Beteswar Temple, Balakbar - Beteswar Rd, Sadi, West Bengal 721446',
} as const

export const templeMapsUrl = templeGoogleMapsUrl

export const templeDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(templeLocation.mapsQuery)}`

export const templeMapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(templeLocation.mapsQuery)}&output=embed&z=17`
