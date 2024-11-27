import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generatePDF(element: HTMLElement, filename: string) {
  try {
    const clone = element.cloneNode(true) as HTMLElement;
    document.body.appendChild(clone);
    clone.style.display = "block";

    const canvas = await html2canvas(clone, {
      scale: 2,
      logging: false,
      useCORS: true,
      windowWidth: 800,
      windowHeight: 1130,
      backgroundColor: "#ffffff",
    });

    document.body.removeChild(clone);

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      0,
      0,
      imgWidth,
      imgHeight
    );
    pdf.save(filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}
