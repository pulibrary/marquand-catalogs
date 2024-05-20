import Footer from './components/Footer.js';
import Header from './components/Header.js';
import PaginatedTable from './components/PaginatedTable.js';
import Marquand from './configs/Marquand.js';
import FacultyAndStaff from './configs/FacultyAndStaff.js';
import GraduateAlumniIndex from './configs/GraduateAlumniIndex.js';
import HonoraryDegree from './configs/HonoraryDegree.js';
import PrincetonAlumniMemorial from './configs/PrincetonAlumniMemorial.js';
import TrusteeIndex from './configs/TrusteeIndex.js';
import UndergradAlumniIndexPart1 from './configs/UndergradAlumniIndexPart1.js';
import WorldWarII from './configs/WorldWarII.js';

// prettier-ignore
const routes = {
  'marquand-catalogs': 'marquand',
  'faculty-and-professional-staff-index': 'faculty_and_staff',
  'princeton-university-graduate-alumni-index': 'graduate_alumni_index',
  'honorary-degree-index': 'honorary_degree',
  'princeton-alumni-weekly-memorial-index': 'princeton_alumni_memorial',
  'trustee-index-1746-2001': 'trustee_index',
  'undergraduate-alumni-index-part-1': 'undergrad_alumni_index_part_1',
  'world-war-ii-memorial-book': 'world_war_ii_memorial'
};

export default {
  name: 'App',
  components: {
    PaginatedTable,
    Header,
    Footer
  },
  computed: {
    metadataConfig() {
      switch (this.desiredRoute) {
        case 'marquand':
          return Marquand;
        case 'faculty_and_staff':
          return FacultyAndStaff;
        case 'graduate_alumni_index':
          return GraduateAlumniIndex;
        case 'honorary_degree':
          return HonoraryDegree;
        case 'princeton_alumni_memorial':
          return PrincetonAlumniMemorial;
        case 'trustee_index':
          return TrusteeIndex;
        case 'undergrad_alumni_index_part_1':
          return UndergradAlumniIndexPart1;
        case 'world_war_ii_memorial':
          return WorldWarII;
        default:
          return Marquand;
      }
    },
    desiredRoute() {
      const routePath = window.location.pathname
        .split('/')
        .filter(n => n)
        .pop();
      return routes[routePath] || routes['marquand'];
    },
    sorterMethod() {
      if (this.metadataConfig.sorter_method) {
        return this.metadataConfig.sorter_method;
      } else {
        return () => {
          return 1;
        };
      }
    },
    bannerUrl() {
      return this.metadataConfig.banner_url || null;
    }
  },
  template: `
    <Header :title="metadataConfig.header_title"></Header>
    <div class="container">
      <div class="container">
        <img v-if="bannerUrl" :src="bannerUrl" class="img-fluid banner" width="1200" height="265" alt="geometric pattern" />
        <h1 class="page-title bg-black text-white">{{ metadataConfig.page_title }}</h1>
      </div>
      <PaginatedTable
        :sorter="sorterMethod"
        :dataUrl="metadataConfig.data_sources"
        :dataColumns="metadataConfig.data_columns"
        :dataTableDescription="metadataConfig.description"
        :dataTableTitle="metadataConfig.table_title"
        :dataFilters="metadataConfig.data_filters"
      ></PaginatedTable>
    </div>
    <Footer></Footer>`
};
