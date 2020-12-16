from tinybaker import Transform, sequence, merge, map_tags
from tinybakerweb import build_server

def build_test_app():
    class StepOne(Transform):
        input_tags = {"foo"}
        output_tags = {"bar"}

        def script(self):
            with self.input_files["foo"].open() as f:
                data = f.read()
            with self.output_files["bar"].open() as f:
                f.write(data)

    class StepTwoParallel1(Transform):
        input_tags = {"bar"}
        output_tags = {"baz"}

        def script(self):
            with self.input_files["bar"].open() as f:
                data = f.read()
            with self.output_files["baz"].open() as f:
                f.write(data + " processed")

    class StepTwoParallel2(Transform):
        input_tags = {"boop", "bar"}
        output_tags = {"beep"}

        def script(self):
            with self.input_files["bar"].open() as f:
                data = f.read()
            with self.output_files["baz"].open() as f:
                f.write(data + " processed")

    class StepThree(Transform):
        input_tags = {"baz", "bleep", "beep"}
        output_tags = {"boppo"}

        def script(self):
            with self.input_files["baz"].open() as f:
                data = f.read()
            with self.input_files["bleep"].open() as f:
                data2 = f.read()
            with self.output_files["boppo"].open() as f:
                f.write(data + " " + data2)

    SequenceOne = sequence([StepOne, merge([StepTwoParallel1, StepTwoParallel2]), StepThree])


    class BuildDf(Transform):
        input_tags = {"raw_images"}
        output_tags = {"df", "labels"}

        def script(self):
            pass

    class Train(Transform):
        input_tags = {"train_df", "train_labels"}
        output_tags = {"model"}

        def script(self):
            pass

    class Predict(Transform):
        input_tags = {"to_predict_on", "model"}
        output_tags = {"predictions"}

        def script(self):
            pass

    class EvaluateResults(Transform):
        input_tags = {"predictions", "test_labels"}
        output_tags = {"accuracy"}

        def script(self):
            pass

    BuildTrainDf = map_tags(
        BuildDf,
        input_mapping={"raw_images": "raw_train_images"},
        output_mapping={"df": "train_df", "labels": "train_labels"},
        name="BuildTrainDf"
    )
    BuildTestDf = map_tags(
        BuildDf,
        input_mapping={"raw_images": "raw_test_images"},
        output_mapping={"df": "to_predict_on", "labels": "test_labels"},
        name="BuildTestDf"
    )

    Pipeline = sequence(
        [
            merge([sequence([BuildTrainDf, Train]), BuildTestDf]),
            Predict,
            EvaluateResults,
        ],
        exposed_intermediates={"model"},
        name="MLPipeline"
    )

    return build_server([SequenceOne, Pipeline])

