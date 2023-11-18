"use client";
import React, { FormEvent, Suspense, useState } from "react";
import Image from "next/image";

const Tab1 = () => {
  const [qrLink, setQrLink] = useState<string>(""); // for option 1
  const [qrLinkArray, setQrLinkArray] = useState<string[]>([]); //for option 2 [
  const [option, setOption] = useState("1"); // 1 = หารเท่าๆกัน, 2 = Russian roulete
  const [people, setPeople] = useState(2);
  const [infoFill, setInfoFill] = useState(true);
  const [telidValid, setTelidValid] = useState(true);
  const [amountValid, setAmountValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountPerPerson, setAmountPerPerson] = useState(0);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const telid = form.telid.value;
    let amount = form.amount.value;
    const leverage = form.leverage?.value;
    //validation
    if (telid === "" || amount === "") {
      setInfoFill(false);
      return;
    } else {
      if (
        telid.length !== 10 &&
        telid.length !== 13 &&
        (parseInt(amount) < 1 || Number.isNaN(parseInt(amount)))
      ) {
        setTelidValid(false);
        setAmountValid(false);
        return;
      } else if (telid.length !== 10 && telid.length !== 13) {
        setTelidValid(false);
        return;
      } else if (parseInt(amount) < 1 || Number.isNaN(parseInt(amount))) {
        setAmountValid(false);
        return;
      }
      //get qrcode
      //option 1
      if (option === "1") {
        setAmount(parseInt(amount));
        amount = parseInt(amount) / people;
        setAmountPerPerson(amount);
        const url = `https://promptpay.io/${telid}/${amount.toString()}`;
        setQrLink(url);
        (document.getElementById("qrcode") as HTMLDialogElement)?.showModal();
      }
      // option 2
      else if (option === "2") {
        let leverageAmount = 5;
        if (leverage !== "") {
          leverageAmount = parseInt(leverage);
        }
        //random price for each person by the amount (the different between max and min is amount-30 baht) and setQrlink different for each person
        let qrLinkArray = [];
        let originalPrice = parseInt(amount);
        let pricePerPerson = originalPrice / people;
        for (let i = 0; i < people - 1; i++) {
          //random price between half of leverage and leverage
          const randomPrice =
            Math.floor(Math.random() * (leverageAmount / 2)) +
            leverageAmount / 2;

          console.log(randomPrice);

          //random 1 or 0
          //1 mean pay more
          //0 mean pay less
          const random = Math.floor(Math.random() * 2);
          let price = 0;
          if (random === 1) {
            price = pricePerPerson + randomPrice;
            originalPrice -= price;
          } else {
            price = pricePerPerson - randomPrice;
            originalPrice -= price;
          }
          qrLinkArray.push(
            `https://promptpay.io/${telid}/${Math.ceil(price).toString()}`
          );
        }

        //last person pay the rest
        qrLinkArray.push(
          `https://promptpay.io/${telid}/${originalPrice.toString()}`
        );
        //shuffle array
        for (let i = qrLinkArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [qrLinkArray[i], qrLinkArray[j]] = [qrLinkArray[j], qrLinkArray[i]];
        }
        setQrLinkArray(qrLinkArray);
        (document.getElementById("qrcode2") as HTMLDialogElement)?.showModal();
      }
    }
  };
  return (
    <>
      <form
        className="form-control w-full max-w-xs"
        onSubmit={onSubmit}
        onClick={() => {
          setInfoFill(true);
          setAmountValid(true);
          setTelidValid(true);
        }}
      >
        <label className="label">
          <span className="label-text text-gray-500">
            เบอร์โทร/เลขบัตรประชาชน
          </span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs shadow-sm"
          name="telid"
        />
        {!telidValid ? (
          <label className="label ">
            <span className="label-text-alt text-red-500">
              เบอร์โทร/เลขบัตรประชาชน ไม่ถูกต้อง
            </span>
          </label>
        ) : (
          <></>
        )}

        <label className="label">
          <span className="label-text text-gray-500">
            จำนวนเงิน (ขั้นต่ำ 1.00 บาท)
          </span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs shadow-sm"
          name="amount"
        />
        {!amountValid ? (
          <label className="label ">
            <span className="label-text-alt text-red-500">
              จำนวนเงินไม่ถูกต้อง
            </span>
          </label>
        ) : (
          <></>
        )}
        <label className="label">
          <span className="label-text text-gray-500">โหมดไหน?</span>
        </label>
        <select
          className="select select-bordered w-full max-w-xs shadow-sm"
          name="option"
          onChange={(e) => setOption(e.target.value)}
        >
          <option defaultValue={"true"} id="1" value={"1"}>
            หารเท่าๆกัน
          </option>
          <option id="2" value={"2"}>
            Russian roulete
          </option>
        </select>
        {option === "2" ? (
          <>
            <label className="label">
              <span className="label-text text-gray-500">
                กำหนดราคาดวง (บาท)
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs shadow-sm"
              name="leverage"
            />
            <label className="label ">
              <span className="label-text-alt text-primary">
                หากไม่กำหนดจะใช้ค่าเริ่มต้น 5 บาท
              </span>
            </label>
            <label className="label ">
              <span className="label-text-alt text-gray-500">
                **โปรดเลือกเลขที่ชอบของแต่ละคนก่อน Roulete (1 ถึง จำนวนคน)
              </span>
            </label>
          </>
        ) : (
          <></>
        )}
        <label className="label">
          <span className="label-text"></span>
        </label>
        {!infoFill ? (
          <p className="text-red-500">กรุณากรอกข้อมูลให้ครบถ้วน</p>
        ) : (
          <></>
        )}
        <label className="label">
          <span className="label-text text-gray-500">หารกี่คน?</span>
        </label>
        <div className="join w-12/12 md:w-4/4 items-center justify-center shadow-md">
          <button
            className="btn join-item bg-indigo-100 border-0"
            onClick={(e) => {
              e.preventDefault();
              if (people > 2) {
                setPeople(people - 1);
              }
            }}
          >
            -
          </button>
          <input
            type="text"
            className="input w-full max-w-xs focus:ring-0 text-center"
            name="people"
            value={people}
            onChange={(e) => {
              setPeople(parseInt(e.target.value));
              window.scrollTo(0, document.body.scrollHeight);
            }}
          />
          <button
            className="btn join-item bg-indigo-100 border-0"
            onClick={(e) => {
              e.preventDefault();
              if (people < 30) {
                setPeople(people + 1);
              }
            }}
          >
            +
          </button>
        </div>
        <label className="label">
          <span className="label-text text-gray-500"></span>
        </label>
        <button className="btn btn-primary text-white shadow-md z-auto text-lg">
          หารเลย
        </button>
      </form>
      {/* qrcode modal option 1*/}
      <dialog id="qrcode" className="modal">
        <div className="modal-box flex flex-col items-center">
          <h3 className="font-bold text-2xl text-center">สแกนเลยจ้า</h3>
          <div className="py-4">
            <Suspense fallback={<div className=" skeleton w-56 h-56"></div>}>
              <Image src={qrLink} alt={"qrcode"} width={500} height={500} />
            </Suspense>
          </div>
          <div className="pb-2 flex flex-col gap-2 items-center">
            <span className="text-xl">ยอดรวม: {amount + " บาท"}</span>
            <span className="text-xl">
              ตกคนละ: {amountPerPerson.toFixed(2) + " บาท"}
            </span>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* qrcode modal option 2*/}
      <dialog id="qrcode2" className="modal">
        <div className="modal-box flex flex-col items-center">
          <span className="font-bold text-2xl text-center">
            Roulette เสี่ยงโชค
          </span>
          <p className="text-red-500">***ห้ามปิดจนกว่าจะ Scan ครบทุกคน</p>
          <div className="py-4 overflow-y-scroll">
            <Suspense fallback={<div className="skeleton w-56 h-56"></div>}>
              {qrLinkArray.map((link, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-4 py-5"
                  >
                    <span className="text-xl">ผู้โชคดีรายที่ {index + 1}</span>
                    {!link ? ( // Assuming link is falsy while data is loading
                      <div className="skeleton w-56 h-56"></div>
                    ) : (
                      <Image
                        src={link}
                        alt={"qrcode"}
                        width={500}
                        height={500}
                      />
                    )}
                  </div>
                );
              })}
            </Suspense>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default Tab1;
