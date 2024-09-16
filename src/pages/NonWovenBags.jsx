import React, { useEffect, useMemo, useState } from "react";

const Chart = () => {
  const [D78, setD78] = useState(515);
  const [D79, setD79] = useState(4.2);
  const [D80, setD80] = useState(2.9);
  const [D81, setD81] = useState(0.25);
  const [D82, setD82] = useState(0.3);
  const [D83, setD83] = useState(0.58);
  const [D84, setD84] = useState(2000);
  const [D85, setD85] = useState(1);
  const [D86, setD86] = useState(8600);
  const [D87, setD87] = useState(12859);
  const [D88, setD88] = useState(16000);
  const [D89, setD89] = useState(21000);
  const [D90, setD90] = useState(27800);
  const [D91, setD91] = useState(1406);
  const [A93, setA93] = useState(5200000);
  const [A95, setA95] = useState(1500000);
  const [A97, setA97] = useState(600000);
  const [A99, setA99] = useState(650000);
  const [F93, setF93] = useState(230000);
  const [AE4, setAE4] = useState(2.0);
  const [N4, setN4] = useState(0.2);
  const [V4, setV4] = useState(0);
  const [AE1toAL1, setAE1toAL1] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedSize, setEditedSize] = useState({ width: "", height: "" });
  const [sizes, setSizes] = useState([
    [21, 28],
    [22, 28],
    [21, 30],
    [22, 32],
    [21, 36],
    [19, 28],
    [19, 29],
    [22, 29],
    [22, 30],
    [19, 22],
    [25, 35],
    [19, 23],
    [19, 24],
    [19, 25],
    [19, 27],
    [20, 28],
    [19, 25],
    [20, 30],
    [20, 32],
    [21, 32],
    [23, 32],
    [23, 36],
    [22, 37],
    [23, 32],
    [24, 33],
    [20, 30],
    [20, 32],
    [23, 32],
    [24, 32],
    [24, 34],
    [20, 28],
    [20, 30],
    [22, 30],
    [22, 32],
    [27, 34],
    [27, 36],
    [28, 40],
    [28, 40],
    [29, 38],
    [29, 37],
    [29, 36],
    [29, 38],
    [29, 38],
    [30, 40],
    [32, 40],
    [32, 41],
    [32, 42],
    [32, 40],
    [34, 41.5],
  ]);
  const [bb5Values, setBb5Values] = useState(
    Array.from({ length: sizes.length }, (_, index) =>
      index < 5
        ? 4
        : index < 9
        ? 2
        : index === 9
        ? 1
        : index === 10
        ? 2
        : index < 48
        ? 1
        : index === 48
        ? 2
        : 0.5
    )
  );
  const [AW5Values, setAW5Values] = useState(
    Array.from({ length: sizes.length }, (_, index) =>
      index < 10
        ? 2
        : index === 10
        ? 4
        : index < 16
        ? 2
        : index === 16
        ? 4
        : index < 21
        ? 2.25
        : index < 25
        ? 4
        : index < 30
        ? 5
        : index < 34
        ? 4
        : index === 34
        ? 3
        : index < 37
        ? 2.25
        : index === 37
        ? 4
        : index === 38
        ? 2.25
        : index === 39
        ? 2
        : index < 42
        ? 5
        : index < 45
        ? 4
        : index < 47
        ? 5
        : index === 47
        ? 2
        : index < 49
        ? 3
        : 0
    )
  );

  const inputs = [
    { label: "Nonwoven", state: [D78, setD78] },
    { label: "Labor/Elec", state: [D79, setD79] },
    { label: "Labor/Elec PP", state: [D80, setD80] },
    { label: "Cutting", state: [D81, setD81] },
    { label: "Filling/Unfilling", state: [D82, setD82] },
    { label: "Tape", state: [D83, setD83] },
    { label: "Zip", state: [D84, setD84] },
    { label: "Plate 28x40", state: [D86, setD86] },
    { label: "Plate 35x50", state: [D87, setD87] },
    { label: "Plate 35x50", state: [D88, setD88] },
    { label: "Plate 40x56", state: [D89, setD89] },
    { label: "Plate 43x63", state: [D90, setD90] },
    { label: "Ink", state: [D91, setD91] },
    { label: "Salery", state: [A93, setA93] },
    { label: "Electric", state: [A95, setA95] },
    { label: "PP", state: [A97, setA97] },
    { label: "Nonwoven+Zeen", state: [A99, setA99] },
    { label: "Slider", state: [D85, setD85] },
    { label: "%", state: [N4, setN4] },
  ];
  const AE3toAL3 = [120, 115, 110, 100, 90, 80, 70, 140];
  const AE2toAL2 = AE3toAL3.map(() => D78 + 5);
  const AZ3 = (0.0000032 * (D91 + D83)).toFixed(4);
  const A100 = A97 * 2 + A99 + F93 * 2;
  const AE4toAL4 = [AE4, AE4, AE4, AE4 + 0.5, AE4 + 0.5, AE4 + 1, AE4 + 1, AE4];
  const N4toV4 = [V4, N4, ...AE3toAL3];

  useEffect(() => {
    const calculatedValues = AE3toAL3.map((value, index) => {
      const AE2 = AE2toAL2[index];
      const AE4 = 0.02;
      return calculateRow1(value, AE2, AE4);
    });

    if (JSON.stringify(calculatedValues) !== JSON.stringify(AE1toAL1)) {
      setAE1toAL1(calculatedValues);
    }
  }, [AE3toAL3, AE2toAL2]);

  const columnHeaders = useMemo(() => [
    { key: "C", value: "Stitching" },
    { key: "D", value: "120GSM" },
    { key: "E", value: "115GSM" },
    { key: "F", value: "110GSM" },
    { key: "G", value: "100GSM" },
    { key: "H", value: "90GSM" },
    { key: "I", value: "80GSM" },
    { key: "J", value: "70GSM" },
    { key: "K", value: "140GSM" },
    { key: "L", value: "Process" },
    { key: "M", value: "Zip" },
    { key: "N", value: "" },
    ...N4toV4.map((value, index) => ({ key: String.fromCharCode(79 + index), value })),
    ...AE3toAL3.map((value, index) => ({ key: String.fromCharCode(87 + index), value })),
    ...AE4toAL4.map((value, index) => ({ key: String.fromCharCode(174 + index), value: value + "%" })),
    { key: "AP", value: "L/E" },
    { key: "AN", value: "O Head" },
    { key: "AO", value: "Act St" },
    { key: "AM", value: "Sttich" },
    { key: "AQ", value: "Zip" },
    { key: "AR", value: "Ups" },
  ], [N4toV4, AE3toAL3, AE4toAL4]);

  const calculateRow = (index = 0, BB5 = 4, AW5 = 2) => {
    const A5 = sizes[index][0];
    const B5 = sizes[index][1];
    const AV5 = AW5 + 1;
    const AM5 = D79 / BB5;
    const AN5 = (AZ3 * A5 * B5) / BB5;
    const AO5 = AV5 + AM5 + AN5;
    const AY = ((sizes[index][1] / BB5) * D84) / 6800 + D85;
    const zip = Math.ceil(AY * 4) / 4;

    let N5;
    if (index === 0 || index === 1) {
      N5 = N4 + 0.08;
    } else if (index === 2) {
      N5 = N4 + 0.07;
    } else if (index === 3) {
      N5 = N4 + 0.05;
    } else if (index === 4) {
      N5 = N4 + 0.04;
    } else if (index === 5 || index === 6) {
      N5 = N4 - 0.03;
    } else if (index === 7 || index === 8) {
      N5 = N4 - 0.05;
    } else if (index === 9 || index === 10) {
      N5 = N4 - 0.09;
    } else if (index > 10 && index < 17) {
      N5 = N4 - 0.1;
    } else {
      N5 = N4 - 0.12;
    }

    const AE5 = (AE1toAL1[0] * A5 * B5) / BB5;
    const AF5 = (AE1toAL1[1] * A5 * B5) / BB5;
    const AG5 = (AE1toAL1[2] * A5 * B5) / BB5;
    const AH5 = (AE1toAL1[3] * A5 * B5) / BB5;
    const AI5 = (AE1toAL1[4] * A5 * B5) / BB5;
    const AJ5 = (AE1toAL1[5] * A5 * B5) / BB5;
    const AK5 = (AE1toAL1[6] * A5 * B5) / BB5;
    const AL5 = (AE1toAL1[7] * A5 * B5) / BB5;

    const O5 = (AE5 + AO5) * N5;
    const P5 = O5;
    const Q5 = P5;
    const R5 = Q5;
    const S5 = R5;
    const T5 = S5;
    const U5 = T5;
    const V5 = U5;

    const W5 = AE5 + AO5 + O5;
    const X5 = AF5 + AO5 + P5;
    const Y5 = AG5 + AO5 + Q5;
    const Z5 = AH5 + AO5 + R5;
    const AA5 = AI5 + AO5 + S5;
    const AB5 = AJ5 + AO5 + T5;
    const AC5 = AK5 + AO5 + U5;
    const AD5 = AL5 + AO5 + V5;

    let L5 = D86;

    if (
      index === 22 ||
      index === 23 ||
      index === 27 ||
      index === 28 ||
      index === 32 ||
      index === 33 ||
      index === 34 ||
      index === 35 ||
      index > 36
    ) {
      L5 = D88;
    }

    const D5 = ceilToHalf(W5 + zip);
    const E5 = ceilToHalf(X5 + zip);
    const F5 = ceilToHalf(Y5 + zip);
    const G5 = ceilToHalf(Z5 + zip);
    const H5 = ceilToHalf(AA5 + zip);
    const I5 = ceilToHalf(AB5 + zip);
    const J5 = ceilToHalf(AC5 + zip);
    const K5 = ceilToHalf(AD5 + zip);

    function ceilToHalf(num) {
      return Math.ceil(num * 2) / 2;
    }

    return [
      "Simple with ZIP Handle",
      D5,
      E5,
      F5,
      G5,
      H5,
      I5,
      J5,
      K5,
      L5,
      zip,
      "",
      "",
      N5.toFixed(2),
      O5.toFixed(2),
      P5.toFixed(2),
      Q5.toFixed(2),
      R5.toFixed(2),
      S5.toFixed(2),
      T5.toFixed(2),
      U5.toFixed(2),
      V5.toFixed(2),

      W5.toFixed(2),
      X5.toFixed(2),
      Y5.toFixed(2),
      Z5.toFixed(2),
      AA5.toFixed(2),
      AB5.toFixed(2),
      AC5.toFixed(2),
      AD5.toFixed(2),

      AE5.toFixed(1),
      AF5.toFixed(1),
      AG5.toFixed(1),
      AH5.toFixed(1),
      AI5.toFixed(1),
      AJ5.toFixed(1),
      AK5.toFixed(1),
      AL5.toFixed(1),

      AM5,
      AN5.toFixed(5),
      (AO5 + 0.01).toFixed(2),
      AW5,
      AV5,
      AY.toFixed(2),
      BB5,
    ];
  };

  const calculateRow1 = (AE3, AE2, AE4) => {
    return (AE3 / 1000 / 1550) * AE2 + (AE3 / 1000 / 1550) * AE2 * AE4;
  };

  const handleBB5Change = (index, newValue) => {
    const updatedBb5Values = [...bb5Values];
    updatedBb5Values[index] = parseFloat(newValue) || 0;
    setBb5Values(updatedBb5Values);
  };

  const handleAW5Change = (index, newValue) => {
    const updatedAW5Values = [...AW5Values];
    updatedAW5Values[index] = parseFloat(newValue) || 0;
    setAW5Values(updatedAW5Values);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedSize({ width: sizes[index][0], height: sizes[index][1] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSize((prevSize) => ({
      ...prevSize,
      [name]: value,
    }));
  };

  const handleSave = (index) => {
    const width = parseFloat(editedSize.width);
    const height = parseFloat(editedSize.height);

    if (!isNaN(width) && !isNaN(height)) {
      const updatedSizes = sizes.map((size, i) =>
        i === index ? [width, height] : size
      );
      setSizes(updatedSizes);
      setEditingIndex(null);
    }
  };

  const rows = () => {
    let calculatedRows = [];
    for (let i = 0; i < sizes.length; i++) {
      calculatedRows.push(calculateRow(i, bb5Values[i], AW5Values[i]));
    }
    return calculatedRows;
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold m-10">NonWoven Bags</h1>

      <div className="my-10 flex flex-row w-[100%] justify-evenly flex-wrap">
        {inputs.map((input, index) => (
          <div key={index}>
            <label>{input.label}: </label>
            <input
              type="number"
              value={input.state[0]}
              onChange={(e) => input.state[1](Number(e.target.value))}
            />
          </div>
        ))}
      </div>
      <div className="flex">
        <table>
          <thead>
            <tr>
              <th colSpan={3}>Sizes</th>
              <th rowSpan={2}>Ups</th>
              <th rowSpan={2}>Act St</th>
            </tr>
            <tr>
              <th colSpan={2}>Sizes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((size, index) => (
              <tr key={index}>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="number"
                      name="width"
                      value={editedSize.width}
                      onChange={handleInputChange}
                    />
                  ) : (
                    size[0]
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="number"
                      name="height"
                      value={editedSize.height}
                      onChange={handleInputChange}
                    />
                  ) : (
                    size[1]
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <button
                      onClick={() => handleSave(index)}
                      className="bg-green-500 text-white"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-blue-500 text-white p-1"
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td>
                  <input
                    type="number"
                    value={bb5Values[index]}
                    defaultValue={0}
                    onChange={(e) => handleBB5Change(index, e.target.value)}
                    className="border p-1"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={AW5Values[index]}
                    defaultValue={0}
                    onChange={(e) => handleAW5Change(index, e.target.value)}
                    className="border p-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table border="1">
          <thead>
            <tr>
              <th colSpan={12}>Nonwoven Sheet Print</th>
              <th colSpan={2}></th>
              <th colSpan={8}>T/P</th>
              <th colSpan={8}></th>
              {AE3toAL3.map((value, idx) => (
                <th key={idx}>{value}</th>
              ))}
              <th></th>
              <th rowSpan={2}>
                Ink <br /> {AZ3}
              </th>
            </tr>
            <tr>
              {columnHeaders.map((col, idx) => (
                <th key={idx}>{col.value}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows().map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border border-gray-300 px-2 py-1 text-sm"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Chart;

{
  /* <div>
{AE1toAL1.map((value, idx) => (
  <span key={idx}>{value.toFixed(4)}</span>
))}
{AE3toAL3.map((value, idx) => (
  <span key={idx}>{value}</span>
))}
{AE2toAL2.map((value, idx) => (
  <span key={idx}>{value}</span>
))}
</div> */
}
