
import './App.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Palomita from './icon-complete.svg';
import TarjetaEnfrente from './bg-card-front.png';
import TarjetaDetras from './bg-card-back.png';
function App() {

  const[confirmacion,setconfirmacion]=useState(false);
  const{register,handleSubmit,formState:{errors},watch}=useForm();

  const inputTarjeta=watch("NumeroTarjeta","0000 0000 0000 0000");
  const inputNombre=watch("Nombre","Jane Appleseed");
  const inputCVC=watch("cvc","000");
  const inputMes=watch("mesVencimiento","00");
  const inputAnio=watch("anioVencimiento","00");

  const onSubmit=handleSubmit((data)=>{
    console.log(data)
    setconfirmacion(true);
  })
  const formatoTarjeta=(value)=>{
    return value.replace(/(\d{4})/g, '$1 ').trim();
  };
  return (
    <div className="App">
    <title>Credit Card Form</title>
      <div className='Tarjetas'>
          <p className='TextoBorrar'>--------------------------------------------------------------</p>
        <div className='TarjetaEnfrente'>
          <p className='ntar'>.</p>
          <p className='ntarjeta'>{formatoTarjeta(inputTarjeta)}</p>
          <p className='nomtarjeta'>{inputNombre} <label className='fechtarjeta'>{inputMes}/{inputAnio}</label></p> 
        </div>
        <div className='TarjetaDetras'>
          <p className='atras'>{inputCVC}</p>
        </div>
      </div>
      <div className='TarjetaPantallaChica'>
      <img src={TarjetaDetras} alt='TarjetaDetras' className='TarjetaDetrasPC'></img>
      <img src={TarjetaEnfrente} alt='TarjetaEnfrente' className='TarjetaEnfrentePC'></img>
      <div className='sobreCVC'>{inputCVC}</div>
      <div className='sobreTarjeta'>{formatoTarjeta(inputTarjeta)}</div>
      <div className='sobreNombre'>{inputNombre}<label className='sobreFecha'>{inputMes}/{inputAnio}</label></div>
      </div>
      <div className='fondoForm'>
        {!confirmacion ?(
        <div className='Form'>
          <form onSubmit={onSubmit}>
            <div className='FormGrande'>
              <label className='TitulosNombre'>CARDHOLDER NAME</label>
              <input 
               minLength={3}
               maxLength={20}
               placeholder='e.g. Jane Appleseed'
               className={`inputGrande ${errors.Nombre ? 'errorNombre' : ''}`}
               {...register("Nombre",{
                required:{
                  value:true,
                  message:"Name is required"
                },
                pattern:{
                  value:/^[A-Za-z\s]+$/,
                  message:"Wrong format"
                },
                
               })}
               >
              </input> 
              <label>{errors.Nombre && <span id="espan" className="espan">{errors.Nombre.message}</span>}</label>
              <label className='Titulos'>CARD NUMBER</label>
              <input 
               placeholder='e.g. 1234 5678 9123 0000'
               maxLength={16}
               className={`inputGrande ${errors.NumeroTarjeta ? 'errorNumTarjeta' : ''}`}
               {...register("NumeroTarjeta",{
                required:{
                  value:true,
                  message:"Credit Card is required"
                },
                pattern:{
                  value: /^\d{16}$/,
                  message:"Wrong format, numbers only"
                }
               })}
               >
              </input>
              <label>{errors.NumeroTarjeta && <span id="espan" className="espan">{errors.NumeroTarjeta.message}</span>}</label>
            </div>
            <div className='Formmini'>
            <p className='Titulosuno'>EXP. DATE <label className='fecha'>(MM/YY)</label><label className='CVC'>CVC</label></p>
            <input 
            placeholder='MM' 
            maxLength={2}
            className={`MM ${errors.mesVencimiento ? 'errorNumTarjeta' : ''}`}
            {...register("mesVencimiento",{
              required:{
                value:true,
                message:"Can't be blank"
              },
              pattern:{
                value:/^[1-9]|1[0-2]$/,
              },
             })}
            >
            </input>
            <label className='yy'>
              <input 
              placeholder='YY'
              maxLength={2}
              className={`YY ${errors.anioVencimiento ? 'errorNumTarjeta' : ''}`} 
              {...register("anioVencimiento",{
                required:{
                  value:true,
                  message:"Can't be blank"
                },
                pattern:{
                  value:/^\d{2}$/,
                },
               })}>
                
                </input>
            </label>
            <label className='Cvc'>
              <input 
              name='cvc'
              placeholder='e.g. 123' 
              maxLength={3}
              className={`cvc ${errors.cvc ? 'errorNumTarjeta' : ''}`}
              {...register("cvc",{
                required:{
                  value:true,
                  message:"Can't be blank"
                },
                pattern:{
                  value:/^\d{3}$/,
                },
               })}
              />
                </label>
              <div>{errors.cvc && <span id="espan" className="espan">{errors.cvc.message}</span>}</div>
            <p className='Confirm'><button type='submit' className='Boton'>Confirm</button></p>
            </div> 
          </form>
        </div>
        ):(
          <div className='ConfirmacionFondo'>
          <div className='Confirmacion'>
            <p><img src={Palomita} alt='Aprobacion' className='Palomita'></img></p>
            <h1 className='Agradecimiento'>THANK YOU!</h1>
            <h2 className='Parrafo'>We've added your card details!</h2>
            <p className='acomodarBoton'><button className='Continue'>Continue</button></p>
          </div>
          </div>
          
        )}
      </div>
    </div>
  );
}

export default App;
