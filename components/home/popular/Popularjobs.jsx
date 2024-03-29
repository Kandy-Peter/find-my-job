import React from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
  const router = useRouter()

  const {data, isLoading, error } = useFetch('search', {
    query: "Javascript developer",
    num_page: 1
  })

  const [selectedJob, setSelectedJob] = React.useState()

  const handleCardPress = (item) => {
    setSelectedJob(item)
    router.push(`/job-details/${item.job_id}`)
  }

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <Pressable>
          <Text style={styles.headerBtn}>Show all</Text>
        </Pressable>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong!</Text>
        ) : (

          <FlatList
            data={data}
            renderItem={({item}) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={item => item?.job_id || item}
            contentContainerStyle={{columnGap: SIZES.medium}}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
