import React, { FormEvent, Suspense, useState } from "react";
import Image from "next/image";
export default function Tab2() {
  const [qrLinkArray1, setQrLinkArray1] = useState<string[]>([]); // for option 1
  const [qrLinkArray2, setQrLinkArray2] = useState<string[]>([]); //for option 2 [
  const [option, setOption] = useState("1"); // 1 = กำหนเอง, 2 = บวก/ลบ
  const [tellid, setTellid] = useState("");
  const [people, setPeople] = useState(2);
  const [infoFill, setInfoFill] = useState(true);
  const [telidValid, setTelidValid] = useState(true);
  const [amountValid, setAmountValid] = useState(true);
  const [amount, setAmount] = useState(0);
  const [amountPerPerson, setAmountPerPerson] = useState(0);
  let inputGroupForm1: any = [];
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const telid = form.telid.value;

    //validation
    if (telid === "") {
      setInfoFill(false);
      return;
    } else {
      if (telid.length !== 10 && telid.length !== 13) {
        setTelidValid(false);
        return;
      }
      setTellid(telid);
      //get qrcode
      //option 1
      if (option === "1") {
        (document.getElementById("define1") as HTMLDialogElement)?.showModal();
      }
      // option 2
      else if (option === "2") {
      }
    }
  };

  const onSubmitDefine1 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    for (let index = 0; index < people; index++) {
      const personAmount = form["person" + (index + 1)].value;
      if (personAmount === "") {
        setInfoFill(false);
        return;
      }
      let link = `https://promptpay.io/${tellid}/${personAmount.toString()}`;
      setQrLinkArray1((qrLinkArray1) => [...qrLinkArray1, link]);
    }
    (document.getElementById("qrcode1") as HTMLDialogElement)?.showModal();
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
          <span className="label-text text-gray-500">โหมดไหน?</span>
        </label>
        <select
          className="select select-bordered w-full max-w-xs shadow-sm"
          name="option"
          onChange={(e) => setOption(e.target.value)}
        >
          <option defaultValue={"true"} id="1" value={"1"}>
            กำหนดเอง
          </option>
          <option id="2" value={"2"} disabled>
            บวก/ลบ
          </option>
        </select>

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
          กำหนดเงิน
        </button>
      </form>

      {/* define table */}
      <dialog id="define1" className="modal">
        <div className="modal-box flex flex-col items-center">
          <h3 className="font-bold text-2xl text-center">กำหนดเอง</h3>

          <form
            action=""
            className="overflow-y-scroll w-full max-w-xs"
            onSubmit={onSubmitDefine1}
          >
            {Array(Math.ceil(people / 2))
              .fill(0)
              .map((person, index) => {
                return (
                  <div key={index} className="flex flex-row gap-1 ">
                    <div className="flex flex-col">
                      <label className="label">
                        <span className="label-text text-gray-500">
                          คนที่ {index * 2 + 1}
                        </span>
                      </label>

                      <input
                        type="text"
                        className="input input-bordered w-full"
                        name={"person" + (index * 2 + 1)}
                        placeholder="0.00 บาท"
                      />
                    </div>
                    {people % 2 != 0 && index === Math.ceil(people / 2) - 1 ? (
                      <>
                        <div className="w-full"></div>
                      </>
                    ) : (
                      <div className="flex flex-col">
                        <label className="label">
                          <span className="label-text text-gray-500">
                            คนที่ {index * 2 + 2}
                          </span>
                        </label>
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          name={"person" + (index * 2 + 2)}
                          placeholder="0.00 บาท"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            <div className="modal-action flex justify-center items-center">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
              <button className="btn btn-primary">สร้าง QR Code</button>
            </div>
          </form>
        </div>
      </dialog>
      {/* qrcode define 1*/}
      <dialog id="qrcode1" className="modal">
        <div className="modal-box flex flex-col items-center">
          <span className="font-bold text-2xl text-center">QR กำหนดเอง</span>
          <p className="text-red-500"></p>
          <div className="py-4 overflow-y-scroll">
            {qrLinkArray1 &&
              qrLinkArray1.map((link, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-4 py-5"
                  >
                    <span className="text-xl">คนที่ {index + 1}</span>
                    <span className="text-xl">
                      ยอด {link.split("/")[4]} บาท
                    </span>
                    <Suspense
                      fallback={<div className="skeleton w-56 h-56"></div>}
                    >
                      <Image
                        src={link}
                        alt={"qrcode"}
                        width={500}
                        height={500}
                      />{" "}
                    </Suspense>
                  </div>
                );
              })}
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
}
