
type CampoFormularioProps = {
    labelContent : string,
    inputType : string,
    inputRef : React.RefObject<HTMLInputElement>,
    required : boolean
}

export const CampoFormulario: React.FC<CampoFormularioProps> = ({labelContent, inputType, inputRef, required}) => {
    
    return (
        <div className="mb-3">
            <label 
                htmlFor="exampleInputName" 
                className="form-label">
                {labelContent}
            </label>
            <input  
                className="form-control" 
                type={inputType}
                id={"input" + labelContent} 
                aria-describedby="nameHelp" 
                ref={inputRef}  
                required={required}
            />
        </div>
    )
}