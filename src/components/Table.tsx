import React, { useState, useMemo } from "react";
import { Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";

interface CustomButton {
  label: string;
  className?: string;
  icon?: React.ReactNode;
  onClick: (row: any) => void;
}
interface TableProps {
  headers: { key: string; label: string }[];
  dataTable: any[];
  onEdit?: (itemToEdit: any) => void;
  onDelete?: (id: any) => void;
  customButtons?: CustomButton[];
  idKey?: string;
  defaultItemsPerPage?: number;
  pageSizeOptions?: number[];
  showDeleteButton?: boolean;
  showEditButton?: boolean;
}

export const Table: React.FC<TableProps> = ({
  headers,
  dataTable,
  onEdit = () => {},
  onDelete = () => {},
  idKey = "id",
  defaultItemsPerPage = 5,
  pageSizeOptions = [5, 10, 20],
  showDeleteButton = true,
  showEditButton = true,
  customButtons = [],
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  // Ordenar los datos
  const sortedData = useMemo(() => {
    let sortableData = [...dataTable];
    if (sortConfig) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [dataTable, sortConfig]);

  // Paginación
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const onSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={16} className="inline-block ml-1" />
    ) : (
      <ChevronDown size={16} className="inline-block ml-1" />
    );
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="p-4 md:p-8 bg-white shadow-xl rounded-2xl max-w-full mx-auto">
      {/* Table for medium and larger screens */}
      <div className="overflow-x-auto hidden md:block">
        <table className="table table-zebra w-full text-base">
          <thead>
            <tr className="bg-primary text-white">
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="p-4 font-bold cursor-pointer hover:bg-primary-focus transition-colors duration-200"
                  onClick={() => onSort(header.key)}>
                  {header.label}
                  {getSortIcon(header.key)}
                </th>
              ))}
              <th className="p-4 font-bold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr
                  key={row[idKey]}
                  className="hover:bg-gray-100 transition-colors duration-200">
                  {headers.map((header) => (
                    <td key={`${row[idKey]}-${header.key}`} className="p-4">
                      {row[header.key]}
                    </td>
                  ))}
                  <td className="p-4 text-center">
                    <div className="flex justify-center space-x-2">
                      {customButtons?.map((button, index) => (
                        <button
                          key={index}
                          className={`btn btn-sm ${button.className}`}
                          onClick={() => button.onClick(row)}>
                          {button.icon}
                          {button.label}
                        </button>
                      ))}
                      {showEditButton && (
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() => onEdit(row)}>
                          <Pencil size={18} />
                        </button>
                      )}
                      {showDeleteButton && (
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => onDelete(row[idKey])}>
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr key="no-data">
                <td
                  colSpan={headers.length + 1}
                  className="text-center p-4 text-gray-500">
                  No hay datos para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* List-style for small screens */}
      <div className="md:hidden">
        {paginatedData.length > 0 ? (
          paginatedData.map((row, index) => (
            <div
              key={row[idKey]}
              className={`bg-gray-50 rounded-lg p-4 shadow-md mb-4 ${
                index % 2 === 0 ? "bg-base-200" : ""
              }`}>
              {headers.map((header) => (
                <div
                  key={`${row[idKey]}-${header.key}`}
                  className="flex justify-between items-center py-1 border-b last:border-b-0">
                  <span className="font-semibold text-gray-600">
                    {header.label}:
                  </span>
                  <span>{row[header.key]}</span>
                </div>
              ))}
              <div className="flex justify-center space-x-2 mt-4">
                {customButtons?.map((button, index) => (
                  <button
                    key={index}
                    className={`btn btn-sm ${button.className}`}
                    onClick={button.onClick}>
                    {button.icon}
                    {button.label}
                  </button>
                ))}
                {showEditButton && (
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => onEdit(row)}>
                    <Pencil size={18} />
                  </button>
                )}
                {showDeleteButton && (
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => onDelete(row[idKey])}>
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div key="no-data2" className="text-center p-4 text-gray-500">
            No hay datos para mostrar.
          </div>
        )}
      </div>

      {/* Resumen y controles */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="text-gray-700">
            View {paginatedData.length} de {sortedData.length} items
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">Items:</label>
            <select
              className="select select-bordered select-sm"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}>
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        {totalPages > 1 && (
          <div className="flex space-x-2 mt-2 md:mt-0">
            <button
              className="btn btn-primary"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}>
              Anterior
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`btn ${
                  currentPage === index + 1 ? "btn-active" : "btn-ghost"
                }`}
                onClick={() => onPageChange(index + 1)}>
                {index + 1}
              </button>
            ))}
            <button
              className="btn btn-primary"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}>
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
