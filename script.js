// Previous JavaScript code remains unchanged until window.onload

window.onload = function () {
    const table = document.getElementById('studentTable');
    
    // Actual student data (sorted later)
    const students = [
        { rollNo: 1, name: 'ABDUL KAVEE' },
        { rollNo: 2, name: 'ABDUL RAHMAN' },
        { rollNo: 3, name: 'HAMEED' },
        { rollNo: 4, name: 'ADITYA' },
        { rollNo: 5, name: 'AHMED SALIH' },
        { rollNo: 6, name: 'AHMED YAALA' },
        { rollNo: 7, name: 'ANAS AHMED' },
        { rollNo: 8, name: 'ANISH' },
        { rollNo: 9, name: 'ANZAF' },
        { rollNo: 10, name: 'ASHWIN' },
        { rollNo: 11, name: 'BURHAN' },
        { rollNo: 12, name: 'HASSAN T' },
        { rollNo: 13, name: 'IVAN' },
        { rollNo: 14, name: 'JARIR' },
        { rollNo: 15, name: 'MAVIYA' },
        { rollNo: 16, name: 'MD HAIDER' },
        { rollNo: 17, name: 'MD ABAAN' },
        { rollNo: 18, name: 'MD ANAS' },
        { rollNo: 19, name: 'MD AREEB' },
        { rollNo: 20, name: 'ASHHAM' },
        { rollNo: 21, name: 'MD AWAIS' },
        { rollNo: 22, name: 'MD JUNAID' },
        { rollNo: 23, name: 'MD SALIF' },
        { rollNo: 24, name: 'MD SAMAAN' },
        { rollNo: 25, name: 'MD SUHAIB' },
        { rollNo: 26, name: 'MD TASHVIQUE' },
        { rollNo: 27, name: 'MD UNAIS' },
        { rollNo: 28, name: 'MD RAYYAN' },
        { rollNo: 29, name: 'MD MUAAZ' },
        { rollNo: 30, name: 'NAZEER' },
        { rollNo: 31, name: 'RAJAT' },
        { rollNo: 32, name: 'SHERON' },
        { rollNo: 33, name: 'YUSUF' },
        { rollNo: 34, name: 'ZAID' },
        { rollNo: 35, name: 'ZUHAIR' },
        { rollNo: 36, name: 'SATTAR' },
        { rollNo: 37, name: 'AFNAN' },
        { rollNo: 38, name: 'BIDI' },
        { rollNo: 39, name: 'CHANDAN' },
        { rollNo: 40, name: 'HASSAN' },
        { rollNo: 41, name: 'MUSSAYIB' },
        { rollNo: 42, name: 'MD ANAS ' },
        { rollNo: 43, name: 'EHTESHAM' },
        { rollNo: 44, name: 'FUZAIL' },
        { rollNo: 45, name: 'HASSAN M' },
        { rollNo: 46, name: 'NUH' },
        { rollNo: 47, name: 'SHAHID ' },
        { rollNo: 48, name: 'SAAD' },
        { rollNo: 49, name: 'SAFWAN' },
        { rollNo: 50, name: 'HASSAN P' },
        { rollNo: 51, name: 'SUBHAN' },
        { rollNo: 52, name: 'BHARATH' },
        { rollNo: 53, name: 'SAMARTH' },
        { rollNo: 54, name: 'UMMAR' },
        { rollNo: 55, name: 'MUNEEB' },
        { rollNo: 56, name: 'SAMI'},
        { rollNo: 57, name: 'PRASANNA'},
    ];

    // Sort by roll number
    students.sort((a, b) => a.rollNo - b.rollNo);

    // Populate table
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td class="checkbox-column"><input type="checkbox"></td>
            <td class="checkbox-column"><input type="checkbox"></td>
        `;
        table.appendChild(row);
    });
};

async function generatePDF() {
    const element = document.querySelector('.container');
    const originalStyles = {
        bodyOverflow: document.body.style.overflow,
        containerWidth: element.style.width,
        tableWidth: element.querySelector('table').style.width
    };

    try {
        // Prepare for PDF capture
        document.body.style.overflow = 'visible';
        element.style.width = 'fit-content';
        element.querySelector('table').style.width = 'auto';

        const canvas = await html2canvas(element, {
            scrollX: 0,
            scrollY: 0,
            useCORS: true,
            scale: 2,
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight
        });

        // PDF configuration
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const pdf = new jspdf.jsPDF({
            orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
            unit: 'px',
            format: [imgWidth, imgHeight]
        });

        pdf.addImage(canvas, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('attendance-record.pdf');

    } catch (error) {
        console.error('PDF generation error:', error);
    } finally {
        // Restore original styles
        document.body.style.overflow = originalStyles.bodyOverflow;
        element.style.width = originalStyles.containerWidth;
        element.querySelector('table').style.width = originalStyles.tableWidth;
    }
}
    
function formatDateToDDMMYYYY(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
}

