
export default function HtmlGenerator(context){
    if(context){
        const html = `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pdf Content</title>
            <style>
                .body {
                    font-size: 16px;
                    display : flex;
                    flex-direction : column;
                }
                .nameField {
                    text-align: center;
                    color : "#7a5050"
                }
                .spacerhorizental{
                    height: 5px;
                    color : "#000";
                    background-color: black;
                }
                .dataHeader{
                    margin: 0;
                    font-size: 34px;
                    font-weight: 600;
                }
                .mainDataWrapper{
                    display: flex;
                    flex-direction: column;
                }
                .dtaWrapperRow{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
                .dataRowItem{
                    display: flex;
                    flex-direction: row;
                    justify-content: start;
                }
                .dataMainTitle{
                    font-size: 28px;
                }
                .dataSecendoryTitle{
                    font-size: 24px;
                    margin-top: 2rem;
                    margin-left: 6px;
                }
            </style>
        </head>
        <body class="body">
            <h1 class="nameField">${context.name}${context.lName}</h1>
                    <h3 class="nameField">${context.jobTitle}</h3>
                    <div>
                    ${Object.keys(context['data']).map((item, i)=>(
                     `<div class="dataContainer">
                        <p class="dataHeader">${item}</p>
                         <hr class="spacerhorizental" />
                         ${context.data[item].map((data) => (
                         `<div class="mainDataWrapper">
                            <div class="dtaWrapperRow">
                                <div class="dataRowItem">
                                    <p class="dataMainTitle">${data.primary}</p>
                                    <p class="dataSecendoryTitle">${data.secondary}</p>
    
    
                                </div>
                                <div class="dataRowItem">
                                    <p class="dataSecendoryTitle">${data.startDate}</p>
                                    <p class="dataSecendoryTitle">-</p>
                                    <p class="dataSecendoryTitle">${data.endDate}</p>
    
                                </div>
                            </div>
                         </div>
                        </div>`
                        ))}
                    </div>`
                    ))}
    
        </body>
        </html>
        `
        return html;
    }
    else{
        return null
    }
}