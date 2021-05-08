const r_months = document.querySelector('.dl_months'),
    years = document.querySelector('.reportYear'),
    reportTitle = document.querySelector('.stickyTitle'),
    contents = document.querySelector('.content');

    document.addEventListener("DOMContentLoaded", () => {
        ui.loadYearToDom(years);
        ui.datalistMonth(months, r_months);
    
        // Get All Records
        records.getAllRecords('http://127.0.0.1:3000/api/v1/records')
            .then(data => {
                let output = "";
                data.records.forEach(record => {
                    const div = document.createElement('div');
                    div.className = 'admin__reports-view';
                    output = `
                        <div class="admin__reports-view--num">
                            ${record.reportID}
                        </div>
                        <div class="admin__reports-view--livesAffected">
                            ${record.livesAffected}
                        </div>
                        <div class="admin__reports-view--COD">
                            ${record.causeOfDiaster}
                        </div>
                        <div class="admin__reports-view--location">
                            ${record.location}
                        </div>
                        <div class="admin__reports-view--DOD">
                            ${record.dayNum} - ${record.month} - ${record.month}
                        </div>
                        <div class="admin__reports-view--operations">
                            <i class="fas fa-eye"></i>
                            <i class="fas fa-edit"></i>
                            <i class="fas fa-trash-alt"></i>
                        </div>
                    `
                    div.innerHTML = output;
                    contents.appendChild(div);
                });
            })
    })
