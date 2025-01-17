interface FiltersProps {
    handleFilter: (priority: string) => void;
    handleSearch: (search : string) => void;
    handleUser: (search : string) => void;
}

const Filters = ( { handleFilter, handleSearch, handleUser} : FiltersProps ) => {
    return (
        <div className="flex items-center mb-6 w-full justify-between">
            <div>
            <div className="relative flex items-center">
                <input 
                    type="text" placeholder="Search" 
                    className="bg-white dark:bg-gray-800 border-2 text-xl text-gray-700 dark:text-gray-300 p-2 rounded-lg ml-4 w-96 pr-10"
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            </div>
            <div className='mr-7 space-x-7'>
                <h1 className="font-extrabold text-xl inline-flex text-black/60 dark:text-gray-300">
                    APPLY FILTER :
                </h1>
                <select 
                    className="bg-gray-200 dark:bg-gray-700 rounded-lg px-3 py-2 text-black/60 dark:text-gray-300"
                    onChange={(e) => handleFilter(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="low">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="urgent">Hard</option>
                </select>
            </div>

        </div>
    )
}


export default Filters