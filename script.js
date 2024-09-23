let totalCompra = 0;

function agregarItem() {
    // Obtener los valores del formulario
    const itemName = document.getElementById("itemName").value;
    const itemPrice = parseFloat(document.getElementById("itemPrice").value);

    // Verificar que el nombre no esté vacío y que el precio sea un número válido
    if (itemName === "" || isNaN(itemPrice) || itemPrice <= 0) {
        alert("Por favor, introduce un nombre válido y un precio mayor a 0.");
        return;
    }

    // Agregar el ítem a la lista
    const listaCompras = document.getElementById("listaCompras");
    const nuevoItem = document.createElement("li");
    nuevoItem.textContent = `${itemName} - $${itemPrice.toFixed(2)}`;
    listaCompras.appendChild(nuevoItem);

    // Actualizar el total
    totalCompra += itemPrice;
    document.getElementById("totalCompra").textContent = totalCompra.toFixed(2);

    // Limpiar los campos
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
}

// Abre la ventana de impresión del navegador

function imprimirLista() {
    window.print(); 
}

function descargarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Lista de Compras", 10, 10);

    // Posición vertical inicial en el PDF
    let yPos = 20;
    const listaCompras = document.querySelectorAll("#listaCompras li");

    listaCompras.forEach(item => {
        doc.setFontSize(12);
        doc.text(item.textContent, 10, yPos);
        yPos += 10;
    });

    doc.setFontSize(16);
    doc.text(`Total: $${totalCompra.toFixed(2)}`, 10, yPos + 10);

    // Descargar el archivo PDF
    doc.save("lista_compras.pdf");
}
