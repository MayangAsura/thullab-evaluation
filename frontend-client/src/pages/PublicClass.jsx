// src/pages/PublicClass.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import HeroBanner from '../components/layout/HeroBanner';
import ClassCard from '../components/learning/ClassCard';
import ReactPaginate from 'react-paginate';
import { Search } from 'lucide-react';

const PAGE_SIZE_OPTIONS = [9, 18, 27];

const PublicClass = () => {
  const [classes, setClasses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState([]);
  const [selectedSort, setSelectedSort] = useState('all'); // all, discount, routine, thematic, special, momentum
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(9);

  // Dummy data – replace with API call (Supabase)
  useEffect(() => {
    // Fetch classes from API and setClasses
    const dummyClasses = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      title: `Kelas ${i + 1}: Belajar Al-Qur'an`,
      thumbnail: `https://picsum.photos/300/200?random=${i}`,
      registrationStart: '2025-08-01',
      registrationEnd: '2025-08-30',
      level: 'Pemula',
      peserta: 'Umum',
      kuota: 30,
      price: i % 2 === 0 ? 0 : 150000,
      isFree: i % 2 === 0,
      instructor: 'Ustadz Ahmad',
      category: ['Tahsin', 'Talaqqi', 'Tahfidz', 'Bahasa Arab', 'Kajian Spesial', 'Daurah', 'Kajian Intensif'][i % 7],
      type: i % 3 === 0 ? 'Gratis' : 'Berbayar',
      pesertaType: ['Khusus Akhawat', 'Khusus Ikhwan', 'Umum', 'Anak-Anak'][i % 4],
      sortTag: ['discount', 'routine', 'thematic', 'special', 'momentum'][i % 5],
    }));
    setClasses(dummyClasses);
  }, []);

  // Filtering logic
  useEffect(() => {
    let result = [...classes];
    if (search) {
      result = result.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (selectedCategory.length) {
      result = result.filter(c => selectedCategory.includes(c.category));
    }
    if (selectedType.length) {
      result = result.filter(c => selectedType.includes(c.type));
    }
    if (selectedParticipant.length) {
      result = result.filter(c => selectedParticipant.includes(c.pesertaType));
    }
    if (selectedSort !== 'all') {
      result = result.filter(c => c.sortTag === selectedSort);
    }
    setFiltered(result);
    setCurrentPage(0);
  }, [classes, search, selectedCategory, selectedType, selectedParticipant, selectedSort]);

  const pageCount = Math.ceil(filtered.length / perPage);
  const displayedClasses = filtered.slice(currentPage * perPage, (currentPage + 1) * perPage);

  const handlePageChange = ({ selected }) => setCurrentPage(selected);

  const toggleFilter = (item, list, setter) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner />
      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari kelas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Column */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
              <h3 className="font-semibold text-lg">Filter</h3>

              {/* Kategori Kelas */}
              <div>
                <h4 className="font-medium mb-2">Kategori Kelas</h4>
                {['Tahsin dan Talaqqi', 'Tahfidz', 'Bahasa Arab', 'Kajian Spesial', 'Daurah', 'Kajian Intensif'].map(cat => (
                  <label key={cat} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selectedCategory.includes(cat)}
                      onChange={() => toggleFilter(cat, selectedCategory, setSelectedCategory)}
                      className="mr-2 accent-primary"
                    />
                    {cat}
                  </label>
                ))}
              </div>

              {/* Jenis Kelas */}
              <div>
                <h4 className="font-medium mb-2">Jenis Kelas</h4>
                {['Gratis', 'Berbayar'].map(type => (
                  <label key={type} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selectedType.includes(type)}
                      onChange={() => toggleFilter(type, selectedType, setSelectedType)}
                      className="mr-2 accent-primary"
                    />
                    {type}
                  </label>
                ))}
              </div>

              {/* Peserta */}
              <div>
                <h4 className="font-medium mb-2">Peserta</h4>
                {['Khusus Akhawat', 'Khusus Ikhwan', 'Umum', 'Anak-Anak'].map(p => (
                  <label key={p} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selectedParticipant.includes(p)}
                      onChange={() => toggleFilter(p, selectedParticipant, setSelectedParticipant)}
                      className="mr-2 accent-primary"
                    />
                    {p}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Classes Grid */}
          <div className="lg:w-3/4">
            {/* Sort Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['all', 'discount', 'routine', 'thematic', 'special', 'momentum'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedSort(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedSort === tag
                      ? 'bg-primary text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tag === 'all' ? 'Semua' : tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedClasses.map(cls => (
                <ClassCard key={cls.id} cls={cls} />
              ))}
            </div>

            {/* Pagination & PerPage Selector */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Tampilkan</span>
                <select
                  value={perPage}
                  onChange={(e) => { setPerPage(Number(e.target.value)); setCurrentPage(0); }}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  {PAGE_SIZE_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <span className="text-sm text-gray-600">per halaman</span>
              </div>

              <ReactPaginate
                previousLabel="← Sebelumnya"
                nextLabel="Berikutnya →"
                pageCount={pageCount}
                onPageChange={handlePageChange}
                forcePage={currentPage}
                containerClassName="flex gap-2"
                pageLinkClassName="px-3 py-1 border border-gray-300 rounded hover:bg-primary hover:text-white"
                activeLinkClassName="bg-primary text-white"
                previousLinkClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                nextLinkClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                disabledClassName="opacity-50 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicClass;