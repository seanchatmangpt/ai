<template>
  <div>
    <UPageHeader
      title="Magic: The Gathering Cards"
      description="Browse and explore Magic: The Gathering cards by set"
    >
      <template #trailing>
        <UButton
          icon="i-heroicons-plus"
          size="sm"
          color="primary"
          variant="solid"
        >
          Add Card
        </UButton>
      </template>
    </UPageHeader>

    <UPageBody>
      <div class="space-y-6">
        <!-- Filters -->
        <UCard>
          <template #header>
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Filters
            </h3>
          </template>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UFormGroup label="Set" name="set">
              <USelectMenu
                v-model="selectedSet"
                :options="setOptions"
                placeholder="Select a set"
                searchable
                @change="onSetChange"
              />
            </UFormGroup>

            <UFormGroup label="Rarity" name="rarity">
              <USelectMenu
                v-model="selectedRarity"
                :options="rarityOptions"
                placeholder="Select rarity"
                @change="onFilterChange"
              />
            </UFormGroup>

            <UFormGroup label="Cards per page" name="pageSize">
              <USelectMenu
                v-model="cardsPerPage"
                :options="pageSizeOptions"
                @change="onPageSizeChange"
              />
            </UFormGroup>
          </div>
        </UCard>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <UIcon
            name="i-heroicons-arrow-path"
            class="w-8 h-8 animate-spin text-primary-500"
          />
          <span class="ml-2 text-gray-600 dark:text-gray-400"
            >Loading cards...</span
          >
        </div>

        <!-- Error State -->
        <UAlert
          v-else-if="error"
          color="red"
          variant="soft"
          title="Error loading cards"
          :description="error"
        />

        <!-- Cards Grid -->
        <div v-else>
          <div class="mb-4 flex justify-between items-center">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Showing {{ startIndex + 1 }}-{{ endIndex }} of
              {{ filteredCards.length }} cards
              <span v-if="selectedSet"> in {{ getSetName(selectedSet) }}</span>
            </p>

            <div class="flex items-center space-x-2">
              <UButton
                icon="i-heroicons-squares-2x2"
                :variant="viewMode === 'grid' ? 'solid' : 'ghost'"
                size="sm"
                @click="viewMode = 'grid'"
              />
              <UButton
                icon="i-heroicons-list-bullet"
                :variant="viewMode === 'list' ? 'solid' : 'ghost'"
                size="sm"
                @click="viewMode = 'list'"
              />
            </div>
          </div>

          <!-- Grid View -->
          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
          >
            <UCard
              v-for="card in paginatedCards"
              :key="card.id"
              class="hover:shadow-lg transition-shadow cursor-pointer"
              @click="selectCard(card)"
            >
              <template #header>
                <div
                  class="aspect-[2/3] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
                >
                  <img
                    :src="`/mtg_dataset/${card.local_image}`"
                    :alt="card.name"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                    loading="lazy"
                  />
                </div>
              </template>

              <div class="space-y-2">
                <h3 class="font-semibold text-sm line-clamp-2">
                  {{ card.name }}
                </h3>
                <p
                  class="text-xs text-gray-600 dark:text-gray-400 line-clamp-1"
                >
                  {{ card.type_line }}
                </p>
                <div class="flex items-center justify-between">
                  <span
                    v-if="card.mana_cost"
                    class="text-xs font-mono text-blue-600 dark:text-blue-400"
                  >
                    {{ card.mana_cost }}
                  </span>
                  <UBadge
                    :color="getRarityColor(card.rarity)"
                    variant="soft"
                    size="xs"
                  >
                    {{ card.rarity }}
                  </UBadge>
                </div>
                <div
                  v-if="card.power && card.toughness"
                  class="text-xs text-gray-500"
                >
                  {{ card.power }}/{{ card.toughness }}
                </div>
              </div>
            </UCard>
          </div>

          <!-- List View -->
          <div v-else class="space-y-2">
            <UCard
              v-for="card in paginatedCards"
              :key="card.id"
              class="hover:shadow-md transition-shadow cursor-pointer"
              @click="selectCard(card)"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-16 h-24 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden flex-shrink-0"
                >
                  <img
                    :src="`/mtg_dataset/${card.local_image}`"
                    :alt="card.name"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                    loading="lazy"
                  />
                </div>

                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-lg">{{ card.name }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ card.type_line }}
                  </p>
                  <div class="flex items-center space-x-4 mt-1">
                    <span
                      v-if="card.mana_cost"
                      class="text-sm font-mono text-blue-600 dark:text-blue-400"
                    >
                      {{ card.mana_cost }}
                    </span>
                    <span
                      v-if="card.power && card.toughness"
                      class="text-sm text-gray-500"
                    >
                      {{ card.power }}/{{ card.toughness }}
                    </span>
                    <UBadge
                      :color="getRarityColor(card.rarity)"
                      variant="soft"
                      size="sm"
                    >
                      {{ card.rarity }}
                    </UBadge>
                  </div>
                </div>

                <div class="text-right text-sm text-gray-500">
                  {{ card.set_name }}
                </div>
              </div>
            </UCard>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center mt-8">
            <UPagination
              v-model="currentPage"
              :page-count="cardsPerPage"
              :total="filteredCards.length"
              show-last
              show-first
            />
          </div>
        </div>
      </div>
    </UPageBody>

    <!-- Card Detail Modal -->
    <UModal v-model="isModalOpen" :ui="{ width: 'sm:max-w-2xl' }">
      <UCard v-if="selectedCard">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold">{{ selectedCard.name }}</h2>
            <UButton
              icon="i-heroicons-x-mark"
              variant="ghost"
              size="sm"
              @click="closeModal"
            />
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              :src="`/mtg_dataset/${selectedCard.local_image}`"
              :alt="selectedCard.name"
              class="w-full rounded-lg"
            />
          </div>

          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium">{{ selectedCard.type_line }}</h3>
              <p
                v-if="selectedCard.mana_cost"
                class="text-blue-600 dark:text-blue-400 font-mono"
              >
                {{ selectedCard.mana_cost }}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-500">Rarity</label>
                <UBadge
                  :color="getRarityColor(selectedCard.rarity)"
                  variant="soft"
                  class="mt-1"
                >
                  {{ selectedCard.rarity }}
                </UBadge>
              </div>

              <div v-if="selectedCard.power && selectedCard.toughness">
                <label class="text-sm font-medium text-gray-500"
                  >Power/Toughness</label
                >
                <p class="mt-1">
                  {{ selectedCard.power }}/{{ selectedCard.toughness }}
                </p>
              </div>
            </div>

            <div v-if="selectedCard.set_name">
              <label class="text-sm font-medium text-gray-500">Set</label>
              <p class="mt-1">{{ selectedCard.set_name }}</p>
            </div>

            <div v-if="selectedCard.oracle_text">
              <label class="text-sm font-medium text-gray-500"
                >Oracle Text</label
              >
              <div
                class="mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm whitespace-pre-line"
              >
                {{ selectedCard.oracle_text }}
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

// Types
interface Card {
  id: string;
  name: string;
  type_line: string;
  mana_cost: string | null;
  oracle_text: string | null;
  power: string | null;
  toughness: string | null;
  rarity: string;
  set_name: string | null;
  set_code: string | null;
  local_image: string;
}

interface SetOption {
  label: string;
  value: string;
}

// Reactive data
const cards = ref<Card[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const selectedSet = ref('');
const selectedRarity = ref('');
const currentPage = ref(1);
const cardsPerPage = ref(24);
const selectedCard = ref<Card | null>(null);
const isModalOpen = ref(false);
const viewMode = ref<'grid' | 'list'>('grid');

// Options
const rarityOptions = [
  { label: 'All Rarities', value: '' },
  { label: 'Common', value: 'common' },
  { label: 'Uncommon', value: 'uncommon' },
  { label: 'Rare', value: 'rare' },
  { label: 'Mythic', value: 'mythic' },
];

const pageSizeOptions = [
  { label: '12 cards', value: 12 },
  { label: '24 cards', value: 24 },
  { label: '48 cards', value: 48 },
  { label: '96 cards', value: 96 },
];

// Computed properties
const availableSets = computed(() => {
  const setMap = new Map<
    string,
    { code: string; name: string; count: number }
  >();
  cards.value.forEach(card => {
    if (card.set_name && card.set_code) {
      const existing = setMap.get(card.set_code);
      if (existing) {
        existing.count++;
      } else {
        setMap.set(card.set_code, {
          code: card.set_code,
          name: card.set_name,
          count: 1,
        });
      }
    }
  });
  return Array.from(setMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
});

const setOptions = computed<SetOption[]>(() => [
  { label: 'All Sets', value: '' },
  ...availableSets.value.map(set => ({
    label: `${set.name} (${set.count})`,
    value: set.code,
  })),
]);

const filteredCards = computed(() => {
  let filtered = cards.value;

  if (selectedSet.value) {
    filtered = filtered.filter(card => card.set_code === selectedSet.value);
  }

  if (selectedRarity.value) {
    filtered = filtered.filter(card => card.rarity === selectedRarity.value);
  }

  return filtered;
});

const totalPages = computed(() => {
  return Math.ceil(filteredCards.value.length / cardsPerPage.value);
});

const startIndex = computed(() => {
  return (currentPage.value - 1) * cardsPerPage.value;
});

const endIndex = computed(() => {
  return Math.min(
    startIndex.value + cardsPerPage.value,
    filteredCards.value.length,
  );
});

const paginatedCards = computed(() => {
  return filteredCards.value.slice(startIndex.value, endIndex.value);
});

// Methods
const loadCards = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await $fetch('/api/cards', {
      query: {
        page: 1,
        limit: 10000 // Load all cards for filtering
      }
    });
    cards.value = response.cards;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred';
  } finally {
    loading.value = false;
  }
};

const onSetChange = () => {
  currentPage.value = 1;
};

const onFilterChange = () => {
  currentPage.value = 1;
};

const onPageSizeChange = () => {
  currentPage.value = 1;
};

const selectCard = (card: Card) => {
  selectedCard.value = card;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedCard.value = null;
};

const getSetName = (setCode: string) => {
  const set = availableSets.value.find(s => s.code === setCode);
  return set ? set.name : setCode;
};

const getRarityColor = (rarity: string) => {
  const colors: Record<string, string> = {
    common: 'gray',
    uncommon: 'green',
    rare: 'yellow',
    mythic: 'red',
  };
  return colors[rarity] || 'gray';
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = '/placeholder-card.jpg';
};

// Watchers
watch([selectedSet, selectedRarity, cardsPerPage], () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = Math.max(1, totalPages.value);
  }
});

// Lifecycle
onMounted(() => {
  loadCards();
});

// Page meta
definePageMeta({
  title: 'Magic: The Gathering Cards',
});
</script>
