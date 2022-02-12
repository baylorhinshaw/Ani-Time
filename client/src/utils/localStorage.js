export const getSavedAnimeIds = () => {
   const savedAnimeId = localStorage.getItem('saved_anime')
     ? JSON.parse(localStorage.getItem('saved_anime'))
     : [];
 
   return savedAnimeId;
 };
 
 export const saveAnimeIds = (saveIdArr) => {
   if (saveIdArr.length) {
     localStorage.setItem('saved_anime', JSON.stringify(saveIdArr));
   } else {
     localStorage.removeItem('saved_anime');
   }
 };
 
 export const removeAnimeId = (animeId) => {
   const savedAnimeIds = localStorage.getItem('saved_anime')
     ? JSON.parse(localStorage.getItem('saved_anime'))
     : null;
 
   if (!savedAnimeIds) {
     return false;
   }
 
   const updatedSavedAnimeIds = savedAnimeIds?.filter((savedAnimeId) => savedAnimeId !== animeId);
   localStorage.setItem('saved_anime', JSON.stringify(updatedSavedAnimeIds));
 
   return true;
 };