import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Hospital {
  id: string;
  name: string;
  location: string;
  city: string;
  rating: number;
  beds: number;
  specialties: string[];
  distance: string;
}

const DUMMY_HOSPITALS: Hospital[] = [
  {
    id: '1',
    name: 'Apollo Hospitals',
    location: 'Banjara Hills',
    city: 'Hyderabad',
    rating: 4.8,
    beds: 450,
    specialties: ['Cardiology', 'Neurology', 'Oncology'],
    distance: '2.5 km',
  },
  {
    id: '2',
    name: 'Max Healthcare',
    location: 'Sector 38',
    city: 'Delhi',
    rating: 4.7,
    beds: 350,
    specialties: ['Orthopedics', 'Cardiology', 'Pediatrics'],
    distance: '3.2 km',
  },
  {
    id: '3',
    name: 'Fortis Hospital',
    location: 'Mulund',
    city: 'Mumbai',
    rating: 4.6,
    beds: 400,
    specialties: ['Gastroenterology', 'Urology', 'Orthopedics'],
    distance: '4.1 km',
  },
  {
    id: '4',
    name: 'AIIMS',
    location: 'New Delhi',
    city: 'Delhi',
    rating: 4.9,
    beds: 2000,
    specialties: ['All Specialties', 'Emergency', 'Research'],
    distance: '1.8 km',
  },
  {
    id: '5',
    name: 'Manipal Hospital',
    location: 'Whitefield',
    city: 'Bangalore',
    rating: 4.7,
    beds: 380,
    specialties: ['Cardiology', 'Neurosurgery', 'Oncology'],
    distance: '5.3 km',
  },
  {
    id: '6',
    name: 'Medanta Hospital',
    location: 'Sector 38',
    city: 'Gurgaon',
    rating: 4.8,
    beds: 500,
    specialties: ['Organ Transplant', 'Cardiology', 'Neurology'],
    distance: '2.8 km',
  },
  {
    id: '7',
    name: 'Asian Hospital',
    location: 'Karol Bagh',
    city: 'Delhi',
    rating: 4.5,
    beds: 320,
    specialties: ['General Surgery', 'Pediatrics', 'ENT'],
    distance: '3.5 km',
  },
  {
    id: '8',
    name: 'Jaslok Hospital',
    location: 'Pedder Road',
    city: 'Mumbai',
    rating: 4.6,
    beds: 380,
    specialties: ['Cardiology', 'Laparoscopy', 'Urology'],
    distance: '4.7 km',
  },
  {
    id: '9',
    name: 'Aster CMI Hospital',
    location: 'Bangalore',
    city: 'Bangalore',
    rating: 4.7,
    beds: 420,
    specialties: ['Orthopedics', 'Cardiology', 'Gastroenterology'],
    distance: '6.1 km',
  },
  {
    id: '10',
    name: 'Lilavati Hospital',
    location: 'Bandra',
    city: 'Mumbai',
    rating: 4.8,
    beds: 350,
    specialties: ['Oncology', 'Cardiology', 'Neurology'],
    distance: '5.9 km',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchText, setSearchText] = useState('');

  const filteredHospitals = useMemo(() => {
    return DUMMY_HOSPITALS.filter((hospital) => {
      const matchesSearch =
        hospital.name.toLowerCase().includes(searchText.toLowerCase()) ||
        hospital.city.toLowerCase().includes(searchText.toLowerCase());

      const matchesLocation =
        selectedLocation === '' ||
        hospital.city.toLowerCase() === selectedLocation.toLowerCase();

      return matchesSearch && matchesLocation;
    });
  }, [searchText, selectedLocation]);

  const uniqueCities = Array.from(new Set(DUMMY_HOSPITALS.map((h) => h.city)));

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: () => {
          logout();
          router.replace('/hospitals-nearby/login');
        },
      },
    ]);
  };

  const renderHospitalCard = ({ item }: { item: Hospital }) => (
    <TouchableOpacity
      style={styles.hospitalCard}
      onPress={() => {
        Alert.alert(item.name, `Location: ${item.location}\nBeds: ${item.beds}`);
      }}
    >
      <View style={styles.cardHeader}>
        <View style={styles.hospitalInfo}>
          <ThemedText type="subtitle" style={styles.hospitalName}>
            {item.name}
          </ThemedText>
          <ThemedText style={styles.location}>
            📍 {item.location}, {item.city}
          </ThemedText>
          <ThemedText style={styles.distance}>{item.distance} away</ThemedText>
        </View>
        <View style={styles.ratingBadge}>
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.ratingLabel}>⭐</Text>
        </View>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <ThemedText style={styles.detailLabel}>Beds: {item.beds}</ThemedText>
        </View>
      </View>

      <View style={styles.specialtiesContainer}>
        {item.specialties.map((specialty, index) => (
          <View key={index} style={styles.specialtyTag}>
            <Text style={styles.specialtyText}>{specialty}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerText}>
          Find Hospitals
        </ThemedText>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search hospital or city..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.filterContainer}>
        <ThemedText style={styles.filterLabel}>Filter by Location:</ThemedText>
        <FlatList
          horizontal
          data={['All', ...uniqueCities]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                (item === 'All' ? selectedLocation === '' : selectedLocation === item) &&
                  styles.filterButtonActive,
              ]}
              onPress={() => {
                setSelectedLocation(item === 'All' ? '' : item);
              }}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  (item === 'All' ? selectedLocation === '' : selectedLocation === item) &&
                    styles.filterButtonTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.resultCount}>
        <ThemedText style={styles.resultText}>
          {filteredHospitals.length} hospitals found
        </ThemedText>
      </View>

      <FlatList
        data={filteredHospitals}
        keyExtractor={(item) => item.id}
        renderItem={renderHospitalCard}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.7,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  resultCount: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  resultText: {
    fontSize: 12,
    opacity: 0.7,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  hospitalCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  hospitalInfo: {
    flex: 1,
    marginRight: 12,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  location: {
    fontSize: 13,
    marginBottom: 4,
    opacity: 0.8,
  },
  distance: {
    fontSize: 12,
    opacity: 0.6,
    color: '#007AFF',
  },
  ratingBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  ratingLabel: {
    fontSize: 12,
  },
  cardDetails: {
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  specialtyTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  specialtyText: {
    fontSize: 11,
    color: '#007AFF',
    fontWeight: '500',
  },
});
