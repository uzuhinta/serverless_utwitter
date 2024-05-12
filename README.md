Common command

```sh
sls -- package # terraform plan; cdk synth

# npm i -D serverless-export-env Migrate from v1 to v2
npm run sls --  export-env --all --overwrite
```

Test cost

- Time to write the test
- Time to read the test
- Time to maintain the test
- Time to run the teset

Test value:

- Catch problems before they happen 
- Prevent regressions
- Gain confidence about our software (specification by example book - manning)
- Specification of our software

=> Consider the return on investment of you tests; Not just about quantity or coverage

![alt text](image.png)

Pro tip:

1. avoid local simulation (eg LocalStack), they're more work than is worth it, and hides common failure modes such as misconfigured permissions and resource policies.

2. Prefer high-level functional test (unit -> integration -> acceptance - e2e)

3. Only use mocks for AWS service to simulate hard-to-reproduce failure cases

4. But always mock your own APIs during integration testing - they're not as stable as AWS services and you know it!

5. Use temporary stacks to run e2e tests