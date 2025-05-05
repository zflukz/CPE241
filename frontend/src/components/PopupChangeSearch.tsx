const PopupChangeSearch: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	return (
	  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
		<div className="bg-white rounded-lg p-6 w-[400px]">
		  <h2 className="text-lg font-semibold mb-4">Edit Search</h2>
  
		  {/* ฟอร์มค้นหาที่ต้องการ */}
		  <div className="space-y-3">
			<div>
			  <label className="text-sm">From</label>
			  <input type="text" className="border p-2 w-full rounded" placeholder="e.g., Bangkok (DMK)" />
			</div>
			<div>
			  <label className="text-sm">To</label>
			  <input type="text" className="border p-2 w-full rounded" placeholder="e.g., Seoul (ICN)" />
			</div>
			<div>
			  <label className="text-sm">Date</label>
			  <input type="date" className="border p-2 w-full rounded" />
			</div>
		  </div>
  
		  <div className="flex justify-end mt-6 space-x-2">
			<button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
			<button className="px-4 py-2 bg-[#C84B2F] text-white rounded">Search</button>
		  </div>
		</div>
	  </div>
	);
  };
export default PopupChangeSearch;  