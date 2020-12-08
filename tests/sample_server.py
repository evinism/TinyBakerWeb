from tinybaker import Transform, sequence
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

    class StepTwo(Transform):
        input_tags = {"bar"}
        output_tags = {"baz"}

        def script(self):
            with self.input_files["bar"].open() as f:
                data = f.read()
            with self.output_files["baz"].open() as f:
                f.write(data + " processed")

    class StepThree(Transform):
        input_tags = {"baz", "bleep"}
        output_tags = {"boppo"}

        def script(self):
            with self.input_files["baz"].open() as f:
                data = f.read()
            with self.input_files["bleep"].open() as f:
                data2 = f.read()
            with self.output_files["boppo"].open() as f:
                f.write(data + " " + data2)

    SequenceOne = sequence([StepOne, StepTwo, StepThree])


    return build_server([SequenceOne])

