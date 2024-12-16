type CampoFormularioProps = {
    labelContent: string;
    inputType?: string; //para inputs tipo texto, numero, email, etc
    inputRef: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
    required?: boolean; //opcional
    inputElement?: "input" | "textarea" | "select"; //para otros tipos de inputs
    options?: string[]; //opciones para selects
} & React.HTMLProps<HTMLInputElement>; //para aceptar otros atributos dinamicos

export const CampoFormulario: React.FC<CampoFormularioProps> = ({
    labelContent,
    inputType = "text",
    inputRef,
    required = false,
    inputElement = "input",
    options,
    ...rest
}) => {
    const id = `input-${labelContent.replace(/\s+/g, "-").toLowerCase()}`; 

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {labelContent}
            </label>
            {inputElement === "input" && (
                <input
                    className="form-control"
                    type={inputType}
                    id={id}
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    required={required}
                    {...rest} //atributos dinamicos
                />
            )}
            {inputElement === "textarea" && (
                <textarea
                    className="form-control"
                    id={id}
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    required={required}
                    {...rest}
                />
            )}
            {inputElement === "select" && options && (
                <select
                    className="form-control"
                    id={id}
                    ref={inputRef as React.RefObject<HTMLSelectElement>}
                    required={required}
                    {...rest}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};


