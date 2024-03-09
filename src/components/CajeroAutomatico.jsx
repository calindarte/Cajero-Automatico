import { useState } from "react";
import Swal from "sweetalert2";

import imgCien from "../images/billete100.jpg"; // Importa tus imágenes aquí
import imgCincuenta from "../images/billete50.jpg";
import imgVeinte from "../images/billete20.jpg";
import imgDiez from "../images/billete10.jpg";
import IconDelete from "./IconDelete";

const CajeroAutomatico = () => {
  const [montoRetiro, setMontoRetiro] = useState("");
  const [opcion, setOpcion] = useState("");
  const billetes = [10000, 20000, 50000, 100000];
  const [cantBilletes, setCantBilletes] = useState([0, 0, 0, 0]);
  const imagenes = [imgDiez, imgVeinte, imgCincuenta, imgCien];

  const handleSubmit = (e) => {
    e.preventDefault();
    setMontoRetiro("");
    setCantBilletes([0, 0, 0, 0]);
    retirarDinero();
    
  };

  if (opcion === "salir") {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Sesión Terminada",
      showConfirmButton: false,
      timer: 1500,
    });
    setOpcion("")
  }

  

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
        setMontoRetiro("");
        return;
      }

      for (let i = 0; i < 4; i++) {
        for (let j = i; j < 4; j++) {
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
            i = -1;
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
      }
  };

  return (
    <>
      <header className=" bg-[#200020] fixed w-full z-10">
        <nav className="flex items-center justify-between px-32 py-4">
          <div className="flex">
            <span className="absolute left-[8%] p-[7px] bg-[#DA0081]"></span>
            <h1 className="font-bold font-sans text-white  text-5xl ">
              Bank
            </h1>
          </div>
          <button
            className="text-white py-2 rounded-sm tracking-wider px-8 bg-[#DA0081]"
            type="button"
            onClick={() => setOpcion("salir")}
          >
            Salir
          </button>
        </nav>
      </header>

      <main className="bg-[url('https://transacciones.nequi.com/bdigital/images/background.png')] bg-right bg-no-repeat bg-[#fbe5f2] pt-20">
        <div className="mx-auto  py-20 w-[40%]  rounded-xl">
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col gap-10 bg-white px-10 py-12 rounded-lg shadow-lg"
          >
            <div className="flex gap-4 items-center">
              <label htmlFor="monto" className=" font-medium text-xl ">
                Monto a Retirar:
              </label>
              <input
                type="number"
                id="monto"
                value={montoRetiro}
                onChange={(e) => setMontoRetiro(e.target.value)}
                placeholder="Ingrese Valor a Retirar"
                className="relative rounded-md py-2 px-3 bg-[#f5f5f5] focus:outline-none focus:ring-[#DA0081] focus:ring-2"
              />
              
            </div>
            <ul className="md:text-lg flex flex-col gap-12  ">
              {billetes.map((billete, index) => (
                <li key={index} className="flex  gap-3 flex-wrap">
                  <span className="font-medium">Billetes de ${billete} :</span>{" "}
                  <span>{cantBilletes[index]}</span>
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
            <div >
              <button
                type="submit"
                className="bg-[#DA0081] text-gray-50 w-full py-2 rounded-md shadow-md"
                onClick={() => setOpcion("retirar")}
              >
                Retirar
              </button>
              <button
              type="submit"
              onClick={() => setOpcion("borrar")}
              className="">
                <IconDelete className="absolute top-[35.5%] left-[66%] " />
              </button>
              
             
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CajeroAutomatico;
