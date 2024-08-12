import React, { useState } from "react";
import Api from "../services/Api";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/authContext";
import SearchBar from "../components/SearchBar";
import ErrorScreen from "../components/ErrorScreen";
import LeadsTable from "../components/LeadsTable";
import CreateLeadModal from "../components/CreateLeadModal";

const Home = () => {
  const { token } = useAuth();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  const { data, isLoading, isError, error, refetch } = useQuery(
    ["leadsList", token, page, pageLimit, sortOrder, searchQuery],
    () => Api.getLeads(token, page, pageLimit, sortOrder, searchQuery),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorScreen message={error.message} retry={refetch} />;
  }

  const totalPages = data.pagination.totalPages;

  const handleSearchQuery = (query) => {
    setPage(1);
    setSearchQuery(query);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="min-h-full w-full container">
      <main className="p-4">
        <section className="my-5 w-full flex items-center gap-4">
          <SearchBar onSearch={(query) => handleSearchQuery(query)} />
        </section>
        <section className="w-full text-right mb-4">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="border rounded-lg shadow-md p-4 py-1"
          >
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>
        </section>
        <CreateLeadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <section>
          <LeadsTable data={data.leads} page={page} pageLimit={pageLimit} />
        </section>
        <div className="flex justify-between items-center py-8">
          <div className="inline-flex shadow-sm ">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="btn-grp-start"
            >
              Previous
            </button>

            {new Array(totalPages).fill(null).map((_, index) => (
              <button
                onClick={() => setPage(index + 1)}
                className="btn-grp-middle"
                key={`btn-${index}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="btn-grp-end"
              data-testid="Next"
            >
              Next
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn bg-purple-500 hover:bg-purple-600"
          >
            Create Lead
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
