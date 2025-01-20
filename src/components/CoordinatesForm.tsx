import React, { useState } from 'react';
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/mira/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default function CoordinatesForm (){
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<string>('');
    const [radius, setRadius] = useState<number>(1);
    const [error, setError] = useState<boolean | null>(true);

    const handleYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numValue = parseFloat(value);
        if (numValue >= -3 && numValue <= 3) {
            setY(value);
            setError(null);
            e.target.setCustomValidity("");
            e.target.reportValidity();
        } else {
            e.target.setCustomValidity("Y должен быть числом от -3 до 3");
            e.target.reportValidity();
            setY(value);
            setError(true);
        }
    };

    const handleSubmit = () => {
        alert(`Координаты: X=${x}, Y=${y}, Радиус=${radius}`);
    };

    return (
        <div className="p-d-flex p-flex-column p-ai-start space-y-4" style={{width: '300px', gap: '1rem'}}>
            <div id="x-fields" className="p-field flex h-15">
                <label htmlFor="x-slider">x</label>
                <Slider
                    id="x-slider"
                    value={x}
                    onChange={(e) => setX(e.value as number)}
                    min={-3}
                    max={5}
                    step={0.1}
                    className="w-3/4 ml-6 mt-3"
                />
            </div>
            <p className="w-3/4 text-center ml-8">{x}</p>

            <div id="y-fields" className="p-field flex h-15">
                <label htmlFor="y-input">y</label>
                <InputText
                    id="y-input"
                    value={y}
                    className="w-3/4 ml-6 h-7 text-center"
                    keyfilter="num"
                    placeholder="-3...3"
                    onChange={handleYChange}
                />
            </div>

            <div className="p-field flex h-15">
                <label htmlFor="radius-slider">r</label>
                <Slider
                    id="radius-slider"
                    value={radius}
                    onChange={(e) => setRadius(e.value as number)}
                    min={0.1}
                    max={5}
                    step={0.1}
                    className="w-3/4 ml-6 mt-3"
                />
            </div>
            <p className="w-3/4 text-center ml-8">{radius}</p>

            <div className="flex justify-between ">
                <Button
                    label="Отправить"
                    icon="pi pi-check"
                    onClick={handleSubmit}
                    disabled={!!error}
                    outlined
                    className="bg-purple-900"
                />
                <Button
                    label="Очистить"
                    icon="pi pi-times"
                    onClick={() => {
                        setX(0);
                        setY('');
                        setRadius(1);
                        setError(null);
                    }}
                    outlined
                    className="hover:bg-blue-500"
                />
            </div>
        </div>
    );
};
