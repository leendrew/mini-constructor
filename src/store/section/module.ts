import { pokemonsApi } from '@/api';
import { generateNumberId } from '@/utils';
import type { GetterTree, ActionTree, MutationTree } from 'vuex';
import type { RootState } from '../store';
import type {
  Section,
  SectionState,
  SectionTypes,
  SectionData,
  SectionId,
  DeleteDataPayload,
  AddDataPayload,
  UpdateDataPayload,
  UpdateObjectDataPayload,
  UpdateSingleArrayDataPayload,
  UpdateAllArrayDataPayload,
} from './types';

export const state: SectionState = {
  sections: [],
};

export const getters: GetterTree<SectionState, RootState> = {
  sectionsLength: (state) => state.sections.length,
};

export const actions: ActionTree<SectionState, RootState> = {
  async addNewSection({ commit }, sectionType: SectionTypes) {
    const sectionDataMap: Record<SectionTypes, SectionData> = {
      text: {
        title: 'Sample Title',
        description: 'Sample Description',
      },
      cards: [
        {
          id: generateNumberId(),
          icon: 'mdi-bookmark-outline',
          title: 'Sample Card Title',
          description: 'Sample Card Description',
        },
      ],
      pokemons: [],
    };
    const newSectionId = generateNumberId();
    const newSectionData = sectionDataMap[sectionType];
    const newSection = {
      id: newSectionId,
      type: sectionType,
      data: newSectionData,
    };
    commit('addSection', newSection);
    if (sectionType === 'pokemons') {
      const pokemonsDataInit = await pokemonsApi.fetchPokemons();
      commit('updateAllArrayData', {
        sectionId: newSectionId,
        sectionType: sectionType,
        data: pokemonsDataInit,
      });
    }
  },
  updateAllSections({ commit }, payload: Section[]) {
    commit('setSections', payload);
  },
  deleteSectionById({ commit }, sectionId: SectionId) {
    commit('deleteById', sectionId);
  },
  deleteDataById({ commit }, payload: DeleteDataPayload) {
    commit('deleteDataById', payload);
  },
  addData({ commit }, payload: AddDataPayload) {
    commit('setData', payload);
  },
  updateData({ commit }, payload: UpdateDataPayload) {
    switch (payload.sectionType) {
      case 'text':
        commit('updateObjectData', payload);
        break;
      case 'cards':
        if (Array.isArray(payload.data)) {
          commit('updateAllArrayData', payload);
        } else {
          commit('updateSingleArrayData', payload);
        }
        break;
      case 'pokemons':
        if (Array.isArray(payload.data)) {
          commit('updateAllArrayData', payload);
        } else {
          commit('updateSingleArrayData', payload);
        }
        break;
      default:
        break;
    }
  },
};

export const mutations: MutationTree<SectionState> = {
  setSections(state, payload: Section[]) {
    state.sections = [...payload];
  },
  addSection(state, newSection: Section) {
    state.sections.push({ ...newSection });
  },
  deleteById(state, sectionId: SectionId) {
    state.sections = state.sections.filter((section) => section.id !== sectionId);
  },
  deleteDataById(state, payload: DeleteDataPayload) {
    state.sections.forEach((section) => {
      if (section.id === payload.sectionId) {
        // @ts-expect-error
        section.data = section.data.filter((data) => data.id !== payload.dataId);
      }
    });
  },
  setData(state, payload: AddDataPayload) {
    state.sections.forEach((section) => {
      if (section.id === payload.sectionId) {
        // @ts-expect-error
        section.data.push(...payload.data);
      }
    });
  },
  updateObjectData(state, payload: UpdateObjectDataPayload) {
    state.sections.forEach((section) => {
      if (section.id === payload.sectionId) {
        section.data = { ...payload.data };
      }
    });
  },
  updateSingleArrayData(state, payload: UpdateSingleArrayDataPayload) {
    state.sections.forEach((section) => {
      if (section.id === payload.sectionId) {
        // @ts-expect-error
        section.data = section.data.map((item) => {
          if (item.id === payload.data.id) {
            return { ...payload.data };
          }
          return item;
        });
      }
    });
  },
  updateAllArrayData(state, payload: UpdateAllArrayDataPayload) {
    state.sections.forEach((section) => {
      if (section.id === payload.sectionId) {
        // @ts-expect-error
        section.data = [...payload.data];
      }
    });
  },
};
