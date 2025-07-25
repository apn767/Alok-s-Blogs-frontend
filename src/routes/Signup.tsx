import { Auth } from '../components/Auth'
import Quote from '../components/Quote'


function signUp() {
  return (
      <div className='lg:grid grid-cols-2 flex justify-center items-center h-screen bg-slate-200 sm:bg-slate-50'>
          <div className='flex justify-center items-center'><Auth type='signup'/></div>
          <div className='hidden lg:block'><Quote /></div>
      </div> 
   
  )
}

export default signUp