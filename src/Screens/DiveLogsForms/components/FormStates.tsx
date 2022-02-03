import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import FEIcons from 'react-native-vector-icons/Feather';

import type { FunctionComponent } from 'react';
import type { Stage } from '../utils/interfaces';
import GradientCircle from '_components/ui/GradientCircle';

interface FormStatesProps {
  stages: Stage[];
  activeId: number;
}

const WIDTH = Dimensions.get('window').width;

const FormStates: FunctionComponent<FormStatesProps> = ({
  stages,
  activeId,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.stageContainer}>
        {stages.map((stage, index) => (
          <React.Fragment key={index}>
            <View style={styles.stage}>
              <View style={styles.stageItem}>
                {stage.id === activeId ? (
                  <>
                    <View style={styles.activeDotContainer}>
                      <GradientCircle style={styles.activeDot}>
                        <FEIcons name="edit-2" size={10} color="white" />
                      </GradientCircle>
                    </View>
                    <Text style={[styles.stageText, { fontWeight: '700' }]}>
                      {stage.name}
                    </Text>
                  </>
                ) : (
                  <>
                    <View style={styles.normalDotContainer}>
                      <GradientCircle style={styles.normalDot} />
                    </View>
                    <Text style={[styles.stageText, { opacity: 0.6 }]}>
                      {stage.name}
                    </Text>
                  </>
                )}
              </View>
              {!!(index !== stages.length - 1) && (
                <View style={styles.demarcator} />
              )}
            </View>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 25,
  },
  stageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stage: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  stageItem: {
    width: WIDTH * 0.2,
    position: 'relative',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  stageText: {
    position: 'relative',
    marginTop: 15,
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
  activeDotContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    padding: 5,
  },
  activeDot: {
    width: '100%',
    height: '100%',
  },
  normalDotContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 5,
    opacity: 0.6,
  },
  normalDot: {
    width: '100%',
    height: '100%',
  },
  demarcator: {
    position: 'absolute',
    right: -20,
    top: 16,
    width: WIDTH * 0.11,
    backgroundColor: '#fff',
    height: 2,
    marginHorizontal: 2,
  },
});

export default FormStates;
