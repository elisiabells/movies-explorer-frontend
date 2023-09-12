function NotFound() {
   const handleGoBack = () => {
     window.history.go(-1);
   };
 
   return (
     <section className='not-found'>
       <h2 className='not-found__number'>404</h2>
       <p className='not-found__title'>Страница не найдена</p>
       <button onClick={handleGoBack} className='not-found__link'>
         Назад
       </button>
     </section>
   );
 }
 
 export default NotFound; 