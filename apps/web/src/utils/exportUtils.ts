
import Papa from 'papaparse';

/**
 * Generic function to export JSON data to CSV and trigger download
 * @param data Array of objects to export
 * @param filename Name of the file to download (without extension)
 */
export function exportToCSV<T>(data: T[], filename: string): void {
  if (!data || !data.length) {
    console.warn('No data to export');
    return;
  }

  // Convert JSON to CSV using PapaParse
  const csv = Papa.unparse(data);
  
  // Create a Blob containing the CSV data
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  
  // Create a temporary download link
  const link = document.createElement('a');
  
  // Create a download URL for the Blob
  const url = URL.createObjectURL(blob);
  
  // Set link attributes
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  // Add link to DOM, trigger click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
