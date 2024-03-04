import { useState } from "react";
import Swal from "sweetalert2";

import imgCien from "../images/billete100.jpg"; // Importa tus imágenes aquí
import imgCincuenta from "../images/billete50.jpg";
import imgVeinte from "../images/billete20.jpg";
import imgDiez from "../images/billete10.jpg";

import logoCajero from "../images/cajero.png"
import logoDinero from "../images/dinero.png"

const  CajeroAutomatico = () =>{
  const [montoRetiro, setMontoRetiro] = useState("");
  const [opcion, setOpcion] = useState("");
  const billetes = [10000, 20000, 50000, 100000];
  const [cantBilletes, setCantBilletes] = useState([0, 0, 0, 0]);
  const imagenes = [imgDiez, imgVeinte, imgCincuenta, imgCien];

  const handleSubmit = (e) => {
    e.preventDefault();
    retirarDinero();
  };

  const retirarDinero = () => {
    if (opcion === "retirar") {
     
      let montoRestante = parseInt(montoRetiro);
      if (montoRestante % 10000 !== 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Monto No Valido!",
          showConfirmButton: false,
          timer: 1500,
        });
        setMontoRetiro("")
        return;

        
      }

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (montoRestante >= billetes[j]) {
            montoRestante -= billetes[j];
            setCantBilletes((prevCantBilletes) => {
              const newCantBilletes = [...prevCantBilletes];
              newCantBilletes[j]++;
              return newCantBilletes;
            });
          }
          if (montoRestante === 0) {
            break;
          } else if (i === 3 && montoRestante !== 0) {
            i=-1;
            
          } 
        }
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Retiro Exitoso!",
        showConfirmButton: false,
        timer: 1500,
      });

      
    } else if (opcion === "borrar") {
      setMontoRetiro("");
      setCantBilletes([0, 0, 0, 0]);
    } else if (opcion === "salir") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Sesión Terminada",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className=" md:border-[30px] border-[14px] border-x-slate-900   bg-amber-500 " >
        
      <div className="flex flex-col  m-4  md:m-20 border-solid border-[10px] md:border-[40px] border-y-slate-600 bg-blue-200  shadow-lg items-center p-6 gap-6 rounded-xl">


        <div className="flex justify-between items-center md:px-8">
        <img src={logoCajero} alt="" className="object-fill w-[10%] h-auto" />
          <h1 className="font-semibold md:text-4xl text-xl">Cajero Automático</h1>
        <img src={logoDinero} alt="" className="object-fill w-[10%] h-auto" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-4  items-start md:items-center ">
            <label htmlFor="monto" className="font-medium md:text-lg ">
              Monto a Retirar:
            </label>
            <input
              type="number"
              id="monto"
              value={montoRetiro}
              onChange={(e) => setMontoRetiro(e.target.value)}
              placeholder="Ingrese Valor a Retirar"
              className=" rounded-md px-2 focus:outline-none focus:ring-sky-500 focus:ring-2"
            />
          </div>
          <ul className="md:text-lg flex flex-col md:gap-8 gap-10  ">
            {billetes.map((billete, index) => (
              <li key={index} className="flex  gap-4 flex-wrap">
                <span className="font-medium">
                  Billetes de ${billete} :
                </span>{" "}
                <span >{cantBilletes[index]}</span>
                {[...Array(cantBilletes[index])].map((_, i) => (
                  <img
                    key={i}
                    src={imagenes[index]}
                    alt={`Billete de ${billete}`}
                    className="w-[40px] md:w-[60px] h-auto"
                  />
                ))}
              </li>
            ))}
          </ul>
          <div className="flex flex-col md:flex-row md:gap-3 gap-5 justify-center  ">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-gray-50 px-10 py-2 rounded-full shadow-md"
              onClick={() => setOpcion("retirar")}
            >
              Retirar
            </button>
            <button
              type="submit"
              className="bg-rose-500 hover:bg-rose-600 text-gray-50 px-10 py-2 rounded-full shadow-md"
              onClick={() => setOpcion("borrar")}
            >
              Borrar
            </button>

            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-gray-50 px-10 py-2 rounded-full shadow-md"
              onClick={() => setOpcion("salir")}
            >
              Salir
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default CajeroAutomatico;
